import * as fs from 'fs';
import * as path from 'path';

export class OrderHelpers {
    ensureDownloadsDir(rootDir: string = process.cwd()): string {
        const downloadsDir = path.join(rootDir, 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }
        return downloadsDir;
    }

    async saveDownloadAndReturnPath(
        download: { suggestedFilename(): string; saveAs(filePath: string): Promise<void> },
        downloadsDir: string
    ): Promise<string> {
        const fileName = download.suggestedFilename();
        const downloadPath = path.join(downloadsDir, fileName);
        await download.saveAs(downloadPath);
        return downloadPath;
    }

    async safeUnlink(filePath: string): Promise<void> {
        try {
            if (fs.existsSync(filePath)) {
                await fs.promises.unlink(filePath);
            }
        } catch {
            // ignore cleanup errors
        }
    }

    readCsvHeaders(filePath: string): string[] {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split(/\r?\n/);
        const headers = (lines[0] ?? '')
            .replace(/^\uFEFF/, '')
            .split(',')
            .map(h => h.trim().replace(/^"(.*)"$/, '$1'));
        return headers;
    }
}

