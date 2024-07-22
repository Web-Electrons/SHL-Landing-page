import path from 'path';

export const loadMessage = (locale) => {
    const localeDir = path.join(process.cwd(), 'locales', locale);
    const messages = {};
    fs.readdirSync(localeDir).forEach(file => {
        if (file.endsWith('.json')) {
            const key = path.basename(file, '.json');
            messages[key] = JSON.parse(fs.readFileSync(path.join(localeDir, file), 'utf-8'));
        }
    });
    return messages;
};