# Fetchly

https://res.cloudinary.com/dg7emvrh9/image/upload/v1791132631/SerialThriller_xllpwi.jpg="Fetchly Logo" width="120" />
</p>

<p align="center">
  <strong>Turn URLs into files.</strong>
</p>

<p align="center">
  Fetchly is a simple URL-to-file conversion tool that turns useful public web content into downloadable files.
</p>

<p align="center">
  <a href="#what-is-fetchly">What is Fetchly?</a> •
  <a href="#features">Features</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#use-cases">Use Cases</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## What is Fetchly?

The internet is full of useful content, but sometimes a URL isn't enough.

You might want to save an article as a PDF, extract a webpage into Markdown, download readable text, or capture a webpage as an image.

**Fetchly makes that process simple.**

Paste a public URL, select the format you want, and Fetchly handles the conversion.

```text
URL
 ↓
Choose Format
 ↓
Fetch
 ↓
Convert
 ↓
Download
```

---

## Features

- **Multi-Format Export**: Convert to PDF, Markdown (`.md`), Plain Text (`.txt`), Standalone HTML, and High-Resolution PNG.
- **Deep Research & Note Extraction**: Automatically isolates executive study notes, core thesis, and actionable bullet takeaways.
- **Zero-Bloat Archiving**: Strips out cookie banners, tracking scripts, subscription popups, and advertisements.
- **Granular Downloads**: Download the complete document, extracted notes, or structured research findings individually.
- **Live In-Browser Preview**: Interactive reader with rendered & source code toggle, zoom controls, and multi-page preview.

---

## How It Works

1. **Paste URL**: Enter any public article, documentation, or blog link.
2. **Select Format**: Choose PDF, Markdown, Plain Text, HTML, or PNG.
3. **Fetch & Extract**: Fetchly retrieves the semantic DOM and performs deep structural analysis.
4. **Preview & Download**: Instant client-side download with zero tracking.

---

## Use Cases

- **Offline Reading**: Save long-form essays, documentation, or news for flight/transit reading.
- **Personal Knowledge Management (PKM)**: Export clean Markdown notes into Obsidian, Notion, or Apple Notes.
- **Archiving & Research**: Preserve critical citations and web data before pages change or links rot.
- **Design & Presentations**: Capture clean 2x retina screenshot assets.

---

## Getting Started

### Prerequisites
- Node.js (v20+)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fetchly.git

# Navigate into the project directory
cd fetchly

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Roadmap

### Phase 01 — Core
- [x] Fetch URL
- [x] URL validation
- [x] Format selection
- [x] File generation
- [x] File download
- [x] Responsive interface

### Phase 02 — More Conversions
- [ ] More output formats
- [ ] Better webpage extraction
- [ ] Improved PDF rendering
- [ ] Better screenshot rendering
- [ ] Batch URL conversion

### Phase 03 — Power Features
- [ ] Browser extension
- [ ] Bookmarklet
- [ ] Mobile share integration
- [ ] Fetchly API
- [ ] Developer API keys
- [ ] Cloud storage integrations

### Phase 04 — Beyond URLs
Explore additional ways users can send content to Fetchly and turn it into useful files without making the product unnecessarily complicated.

---

## Contributing

Contributions, ideas, bug reports, and improvements are welcome.

Before contributing:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Make your changes.
4. Test the changes (`npm run lint` & `npm run build`).
5. Submit a pull request.

Keep contributions focused on improving the Fetchly experience.

---

## License

This project is licensed under the Apache-2.0 License.
