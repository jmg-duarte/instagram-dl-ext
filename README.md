# ⬇️ Instagram Downloader

<div>
<img align="right" width="400" src="static/screenshot.png" alt="Extension Screenshot">

A Firefox browser extension for downloading Instagram images with a single click.


## Installation

### For Users
1. Download the latest release from [Releases](../../releases)
2. In Firefox, go to `about:addons`
3. Click the gear icon and select "Install Add-on From File"
4. Select the downloaded `.zip` file

## Usage

1. Navigate to Instagram
2. Look for the ⬇️ download button on the top left corner of images
3. Click to download the image to your default downloads folder

</div>

## Browser Support

| Browser     | Status      | Notes                             |
| ----------- | ----------- | --------------------------------- |
| Firefox     | ✅ Tested   | Fully supported                   |
| Chrome/Edge | ❓ Untested | May work with minor modifications |

## Development

```bash
# Clone the repository
git clone https://github.com/jmg-duarte/insta-downloader.git
cd insta-downloader

# Install dependencies
pnpm install

# Build the extension
pnpm run build

# Package for distribution
pnpm run package

# Run in development mode
pnpm run dev
```

### Project Structure
```
src/
├── background.ts    # Extension background script
├── content.ts       # Content script for Instagram pages
styles/
├── content.css      # Styling for download buttons
icons/               # Extension icons
manifest.json        # Extension manifest (development)
manifest-dist.json   # Extension manifest (production)
```

### Scripts
- `pnpm run build` - Compile TypeScript
- `pnpm run watch` - Watch mode for development
- `pnpm run package` - Build and package extension
- `pnpm run lint` - Validate extension
- `pnpm run clean` - Clean build artifacts

### GitHub Actions
The project includes automated building and packaging via GitHub Actions. When you push a release tag (e.g., `v1.0.0`), it automatically:
- Builds the extension
- Packages it for distribution
- Creates a GitHub release with the packaged extension



## Disclaimer

This project is for educational purposes.
This extension is not affiliated with Instagram or Meta.
Use responsibly and in accordance with Instagram's Terms of Service.
