interface DownloadMessage {
  action: string;
  url?: string;
  filename?: string;
}

function createButton(element: HTMLImageElement) {
  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = '⬇️';
  downloadBtn.classList.add("instagram-download-btn")
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const message: DownloadMessage = {
      action: 'downloadImage',
      url: element.src,
      filename: `instagram-image-${Date.now()}.jpg`
    };

    chrome.runtime.sendMessage(message);
  });
  return downloadBtn
}

function addDownloadButton(htmlElement: HTMLImageElement) {
  if (htmlElement.dataset.downloadButtonAdded) {
    return;
  }

  const downloadBtn = createButton(htmlElement)

  const container = htmlElement.parentElement;
  if (container) {
    container.style.position = 'relative';
    container.appendChild(downloadBtn);
  }

  htmlElement.dataset.downloadButtonAdded = 'true';
}

function addDownloadButtons(): void {
  outer: for (const img of Array.from(document.querySelectorAll('img[src*="fbcdn.net"]'))) {
    const imageElement = img as HTMLImageElement;
    // Ignore profile pictures (which all have "... profile picture" as alt-text)
    if (!(imageElement.alt && !imageElement.alt.includes("profile picture"))) {
      continue
    }
    // Do not show the download button on profile pages, only singular posts
    let currentNode = imageElement.parentNode
    // 3 is somewhat arbitrary, it will break if Instagram changes the structure,
    // but I needed a cap so I don't check the whole tree
    for (let attempt = 0; currentNode && attempt < 3; attempt += 1) {
      if (currentNode && "tagName" in currentNode && currentNode.tagName === "A") {
        continue outer;
      }
      currentNode = currentNode?.parentNode
    }
    addDownloadButton(imageElement)
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'initDownloader') {
    addDownloadButtons();
  }
});

const observer = new MutationObserver(() => {
  addDownloadButtons();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

addDownloadButtons();
