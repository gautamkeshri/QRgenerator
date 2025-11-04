export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve the main HTML page
    if (url.pathname === '/' || url.pathname === '') {
      return new Response(getHTML(), {
        headers: {
          'Content-Type': 'text/html;charset=UTF-8',
        },
      });
    }

    // Return 404 for other paths
    return new Response('Not Found', { status: 404 });
  },
};

function getHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR Code Generator</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 500px;
            width: 100%;
        }

        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 10px;
            font-size: 2em;
        }

        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 0.9em;
        }

        .input-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            color: #555;
            margin-bottom: 8px;
            font-weight: 500;
        }

        input[type="text"], input[type="url"] {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        input[type="text"]:focus, input[type="url"]:focus {
            outline: none;
            border-color: #667eea;
        }

        .button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        .button:active {
            transform: translateY(0);
        }

        .button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        #qrcode-container {
            margin-top: 30px;
            display: none;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 12px;
        }

        #qrcode-container.active {
            display: flex;
        }

        #qrcode {
            margin-bottom: 20px;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .qr-info {
            text-align: center;
            color: #666;
            margin-bottom: 15px;
            font-size: 0.9em;
        }

        .download-btn {
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
        }

        .download-btn:hover {
            background: #45a049;
        }

        .error {
            color: #f44336;
            font-size: 0.9em;
            margin-top: 5px;
            display: none;
        }

        .error.active {
            display: block;
        }

        @media (max-width: 600px) {
            .container {
                padding: 30px 20px;
            }

            h1 {
                font-size: 1.5em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔲 QR Code Generator</h1>
        <p class="subtitle">Generate QR codes instantly for any URL</p>

        <div class="input-group">
            <label for="url-input">Enter URL:</label>
            <input
                type="url"
                id="url-input"
                placeholder="https://example.com"
                autocomplete="url"
            />
            <div class="error" id="error-message">Please enter a valid URL</div>
        </div>

        <button class="button" id="generate-btn">Generate QR Code</button>

        <div id="qrcode-container">
            <div id="qrcode"></div>
            <p class="qr-info">Scan this QR code with your mobile device</p>
            <button class="download-btn" id="download-btn">Download QR Code</button>
        </div>
    </div>

    <script>
        const urlInput = document.getElementById('url-input');
        const generateBtn = document.getElementById('generate-btn');
        const qrcodeContainer = document.getElementById('qrcode-container');
        const qrcodeDiv = document.getElementById('qrcode');
        const downloadBtn = document.getElementById('download-btn');
        const errorMessage = document.getElementById('error-message');
        let currentQRCode = null;

        // Validate URL
        function isValidURL(string) {
            try {
                const url = new URL(string);
                return url.protocol === 'http:' || url.protocol === 'https:';
            } catch (err) {
                return false;
            }
        }

        // Generate QR Code
        function generateQRCode() {
            const url = urlInput.value.trim();

            // Validate URL
            if (!url) {
                errorMessage.textContent = 'Please enter a URL';
                errorMessage.classList.add('active');
                return;
            }

            if (!isValidURL(url)) {
                errorMessage.textContent = 'Please enter a valid URL (must start with http:// or https://)';
                errorMessage.classList.add('active');
                return;
            }

            // Clear error
            errorMessage.classList.remove('active');

            // Clear previous QR code
            qrcodeDiv.innerHTML = '';

            // Generate new QR code
            currentQRCode = new QRCode(qrcodeDiv, {
                text: url,
                width: 256,
                height: 256,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            // Show QR code container
            qrcodeContainer.classList.add('active');
        }

        // Download QR Code
        function downloadQRCode() {
            const canvas = qrcodeDiv.querySelector('canvas');
            if (canvas) {
                const url = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = url;
                link.click();
            }
        }

        // Event listeners
        generateBtn.addEventListener('click', generateQRCode);
        downloadBtn.addEventListener('click', downloadQRCode);

        // Generate on Enter key
        urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                generateQRCode();
            }
        });

        // Clear error on input
        urlInput.addEventListener('input', () => {
            errorMessage.classList.remove('active');
        });
    </script>
</body>
</html>`;
}
