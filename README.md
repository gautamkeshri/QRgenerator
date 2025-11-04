# QR Code Generator - Cloudflare Workers App

A simple and elegant QR code generator built with Cloudflare Workers. Users can enter any URL and generate a QR code that redirects to that URL when scanned from a mobile device.

## Features

- 🔲 Generate QR codes for any URL instantly
- 📱 Mobile-friendly responsive design
- ⬇️ Download QR codes as PNG images
- ⚡ Fast and serverless (powered by Cloudflare Workers)
- 🎨 Beautiful gradient UI
- ✅ URL validation
- 🔒 HTTPS enforcement

## How It Works

1. User enters a URL in the input field
2. Click "Generate QR Code" button
3. QR code is generated instantly using the QRCode.js library
4. Scan the QR code with any mobile device
5. The URL opens in a new browser tab automatically
6. Optional: Download the QR code as an image

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Cloudflare account (for deployment)
- Wrangler CLI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QRgenerator
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the app locally:
```bash
npm run dev
```

This will start a local development server. Open your browser and navigate to `http://localhost:8787`

## Deployment

### First-time Setup

1. Install Wrangler CLI globally (if not already installed):
```bash
npm install -g wrangler
```

2. Login to your Cloudflare account:
```bash
wrangler login
```

### Deploy to Cloudflare Workers

Deploy your app:
```bash
npm run deploy
```

After deployment, Wrangler will provide you with a URL where your app is live (e.g., `https://qr-code-generator.<your-subdomain>.workers.dev`)

## Project Structure

```
QRgenerator/
├── src/
│   └── index.js          # Main worker script with HTML interface
├── package.json          # Project dependencies and scripts
├── wrangler.toml         # Cloudflare Workers configuration
└── README.md            # This file
```

## Configuration

The `wrangler.toml` file contains the Cloudflare Workers configuration:

- `name`: The name of your worker
- `main`: Entry point for the worker
- `compatibility_date`: Cloudflare Workers compatibility date

## Technologies Used

- **Cloudflare Workers**: Serverless edge computing platform
- **QRCode.js**: JavaScript library for QR code generation
- **HTML5/CSS3**: Frontend markup and styling
- **Vanilla JavaScript**: Client-side functionality

## Usage Example

1. Open the app in your browser
2. Enter a URL (e.g., `https://example.com`)
3. Click "Generate QR Code"
4. Scan the generated QR code with your phone's camera
5. The URL will open in your mobile browser automatically

## Customization

You can customize the app by editing `src/index.js`:

- Change the color scheme by modifying the CSS gradients
- Adjust QR code size by changing the `width` and `height` values
- Modify error correction level in the QRCode options
- Add additional features like QR code customization options

## Security

- All URLs are validated before QR code generation
- Only HTTP and HTTPS protocols are allowed
- Client-side validation prevents malformed URLs

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
