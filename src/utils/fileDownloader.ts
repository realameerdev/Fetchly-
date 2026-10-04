/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import { OutputFormat } from '../components/ConversionTool';
import { ExtractedPageData } from '../components/FilePreviewModal';

/**
 * Generate a genuine, valid binary PDF using jsPDF that opens in any PDF reader.
 */
export function generateValidPdfBlob(docData: ExtractedPageData): Blob {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let cursorY = 22;

  const title = docData.title || 'Extracted Document';
  const sourceUrl = docData.sourceUrl || '';
  const summary = docData.summary || 'Clean web content extracted via Fetchly.';

  // Top Accent bar
  doc.setFillColor(235, 68, 35); // #EB4423
  doc.rect(margin, cursorY - 6, contentWidth, 3, 'F');
  cursorY += 6;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 8 + 2;

  // Source & Metadata
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  const metaText = `Source: ${sourceUrl}  |  Archived via Fetchly  |  Date: ${new Date().toLocaleDateString()}`;
  const metaLines = doc.splitTextToSize(metaText, contentWidth);
  doc.text(metaLines, margin, cursorY);
  cursorY += metaLines.length * 4.5 + 4;

  // Divider
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.4);
  doc.line(margin, cursorY, margin + contentWidth, cursorY);
  cursorY += 7;

  // Summary Callout Box
  doc.setFillColor(255, 247, 237); // orange-50
  doc.setDrawColor(235, 68, 35); // orange-500
  doc.setLineWidth(0.8);
  
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(`"${summary}"`, contentWidth - 10);
  const boxHeight = summaryLines.length * 5 + 8;
  
  doc.rect(margin, cursorY, contentWidth, boxHeight, 'FD');
  doc.text(summaryLines, margin + 5, cursorY + 6);
  cursorY += boxHeight + 8;

  // Content Paragraphs
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Document Contents', margin, cursorY);
  cursorY += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  const rawText = docData.plainText || docData.markdown?.replace(/[#*`>_]/g, '') || summary;
  const paragraphs = rawText.split('\n\n').filter(p => p.trim().length > 0);

  for (const para of paragraphs) {
    const lines = doc.splitTextToSize(para.trim(), contentWidth);
    const neededHeight = lines.length * 5 + 4;

    if (cursorY + neededHeight > pageHeight - margin - 15) {
      // Add new page
      doc.addPage();
      cursorY = 22;
    }

    doc.text(lines, margin, cursorY);
    cursorY += neededHeight;
  }

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Saved with Fetchly · Permanent Clean Archive', margin, pageHeight - 10);
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
  }

  return doc.output('blob');
}

/**
 * Generate a genuine, valid PNG image using HTML5 Canvas that opens in any photo viewer.
 */
export async function generateValidPngBlob(docData: ExtractedPageData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 1500;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // Top header banner
  ctx.fillStyle = '#FAF8F5';
  ctx.fillRect(0, 0, width, 180);
  ctx.fillStyle = '#EB4423';
  ctx.fillRect(0, 0, width, 8);

  // Top badge
  ctx.fillStyle = '#EB4423';
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('FETCHLY CLEAN ARCHIVE', 60, 50);

  // Date
  ctx.fillStyle = '#64748B';
  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, width - 240, 50);

  // Title
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const title = docData.title || 'Extracted Document';
  ctx.fillText(title.slice(0, 50), 60, 110);

  // Source URL
  ctx.fillStyle = '#64748B';
  ctx.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Source: ${docData.sourceUrl || ''}`.slice(0, 85), 60, 150);

  // Divider line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 180);
  ctx.lineTo(width - 60, 180);
  ctx.stroke();

  // Summary Callout Box
  ctx.fillStyle = '#FFF7ED';
  ctx.fillRect(60, 220, width - 120, 160);
  ctx.strokeStyle = '#EB4423';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(60, 220);
  ctx.lineTo(60, 380);
  ctx.stroke();

  ctx.fillStyle = '#9A3412';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('EXECUTIVE SUMMARY', 85, 255);

  ctx.fillStyle = '#334155';
  ctx.font = 'italic 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const summary = docData.summary || 'Clean web content extracted via Fetchly.';
  ctx.fillText(`"${summary.slice(0, 110)}"`, 85, 295);
  if (summary.length > 110) {
    ctx.fillText(`${summary.slice(110, 220)}...`, 85, 330);
  }

  // Content preview
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Extracted Text & Editorial Overview', 60, 440);

  ctx.fillStyle = '#475569';
  ctx.font = '19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const rawText = docData.plainText || docData.markdown?.replace(/[#*`>_]/g, '') || summary;
  const words = rawText.split(' ');
  let line = '';
  let y = 490;
  const maxWidth = width - 120;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, 60, y);
      line = words[i] + ' ';
      y += 34;
      if (y > height - 120) break;
    } else {
      line = testLine;
    }
  }
  if (y <= height - 120) {
    ctx.fillText(line, 60, y);
  }

  // Footer bar
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, height - 80, width, 80);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Generated by Fetchly Instant URL-to-File Engine · Full Resolution PNG', 60, height - 35);
  ctx.fillText('100% Valid Image Asset', width - 240, height - 35);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create PNG blob from canvas'));
      }
    }, 'image/png');
  });
}

/**
 * Downloads the document in the requested format as a 100% genuine, accessible file.
 */
export async function downloadDocument(
  docData: ExtractedPageData,
  format: OutputFormat,
  suggestedFilename?: string
): Promise<void> {
  let blob: Blob;
  let extension: string;

  const cleanDomain = (docData.domain || 'web').replace(/[^a-z0-9]+/gi, '_');
  const cleanTitle = (docData.title || 'document').replace(/[^a-z0-9]+/gi, '_').slice(0, 30).toLowerCase();
  const baseName = suggestedFilename || `fetchly_${cleanDomain}_${cleanTitle}`;

  if (format === 'PDF') {
    blob = generateValidPdfBlob(docData);
    extension = 'pdf';
  } else if (format === 'PNG') {
    blob = await generateValidPngBlob(docData);
    extension = 'png';
  } else if (format === 'Markdown') {
    const content = docData.markdown || `# ${docData.title}\n\n${docData.summary}`;
    blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    extension = 'md';
  } else if (format === 'HTML') {
    const htmlContent = docData.html || `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${docData.title || 'Clean Document'}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    h1 { color: #0f172a; border-bottom: 2px solid #eb4423; padding-bottom: 8px; }
    .meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }
    blockquote { background: #fff7ed; border-left: 4px solid #eb4423; padding: 12px 16px; margin: 20px 0; border-radius: 0 8px 8px 0; font-style: italic; color: #475569; }
    footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>${docData.title || 'Extracted Document'}</h1>
  <div class="meta">Source: <a href="${docData.sourceUrl}">${docData.sourceUrl}</a> · Saved with Fetchly</div>
  <blockquote>${docData.summary || ''}</blockquote>
  <div>${(docData.markdown || '').split('\n\n').map(p => `<p>${p}</p>`).join('')}</div>
  <footer>Clean offline document generated by Fetchly.</footer>
</body>
</html>`;
    blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    extension = 'html';
  } else {
    // TXT
    const txtContent = docData.plainText || `TITLE: ${docData.title}\nSOURCE: ${docData.sourceUrl}\n\n${docData.summary}`;
    blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    extension = 'txt';
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${baseName}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/**
 * Downloads the dedicated extracted note component (.md or .txt or .pdf).
 */
export async function downloadExtractedNote(
  docData: ExtractedPageData,
  format: 'Markdown' | 'TXT' | 'PDF' = 'Markdown'
): Promise<void> {
  const noteTitle = docData.notes?.title || `Note - ${docData.title || 'Untitled'}`;
  const cleanTitle = noteTitle.replace(/[^a-z0-9]+/gi, '_').slice(0, 35).toLowerCase();
  const baseName = `fetchly_note_${cleanTitle}`;

  if (format === 'PDF') {
    const notePdfData: ExtractedPageData = {
      ...docData,
      title: noteTitle,
      plainText: docData.notes?.plainText || docData.notes?.markdown || docData.plainText || '',
      summary: docData.notes?.keyTakeaways?.join(' · ') || docData.summary || 'Extracted Note via Fetchly',
    };
    const blob = generateValidPdfBlob(notePdfData);
    triggerBlobDownload(blob, `${baseName}.pdf`);
  } else if (format === 'TXT') {
    const textContent = docData.notes?.plainText || docData.notes?.markdown || '';
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    triggerBlobDownload(blob, `${baseName}.txt`);
  } else {
    // Markdown
    const mdContent = docData.notes?.markdown || `# ${noteTitle}\n\n${docData.notes?.plainText || ''}`;
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    triggerBlobDownload(blob, `${baseName}.md`);
  }
}

/**
 * Downloads key research findings and takeaways as a structured briefing (.md).
 */
export async function downloadResearchFindings(docData: ExtractedPageData): Promise<void> {
  const cleanTitle = (docData.title || 'research').replace(/[^a-z0-9]+/gi, '_').slice(0, 30).toLowerCase();
  let content = `# 🔍 Research Findings & Takeaways: ${docData.title}\n`;
  content += `**Source:** ${docData.sourceUrl}\n**Date:** ${new Date().toLocaleDateString()}\n\n---\n\n`;

  if (docData.keyFindings && docData.keyFindings.length > 0) {
    content += `## Key Findings\n\n`;
    docData.keyFindings.forEach((f, idx) => {
      content += `### ${idx + 1}. ${f.label}\n${f.detail}\n\n`;
    });
  }

  if (docData.quotes && docData.quotes.length > 0) {
    content += `## Notable Quotes & Statements\n\n`;
    docData.quotes.forEach(q => {
      content += `> "${q.quote}"\n> — *${q.author || 'Source'}* ${q.context ? `(${q.context})` : ''}\n\n`;
    });
  }

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  triggerBlobDownload(blob, `fetchly_findings_${cleanTitle}.md`);
}

function triggerBlobDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
