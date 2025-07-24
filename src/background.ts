chrome.runtime.onInstalled.addListener(() => {
  console.log('Instagram Downloader extension installed');
});

chrome.browserAction.onClicked.addListener((tab) => {
  if (tab.url?.includes('instagram.com')) {
    chrome.tabs.sendMessage(tab.id!, { action: 'initDownloader' });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImage') {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename
    });
  }
});