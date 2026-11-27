
class _theme {
    constructor() {
        const self = this
        self.COOKIE_DAYS = 365;
        self.COOKIE_NAME = 'theme';
        self.media = window.matchMedia('(prefers-color-scheme: dark)');

        let btn = $('#themeBtn button')[0]
        btn.addEventListener('click', () => {
            const pref = btn.dataset.themeValue;
            self.setCookie(self.COOKIE_NAME, pref, self.COOKIE_DAYS);
            self.applyTheme(btn, pref);
        });

        // 系統外觀改變時，若為「跟隨系統」則即時切換
        self.media.addEventListener('change', () => {
            if (self.getPreference() === 'auto')
                self.applyTheme(btn, 'auto');
        });

        self.applyTheme(btn, self.getPreference());
    }

    getCookie(name) {
        const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
        return m ? decodeURIComponent(m[1]) : null;
    }

    setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
    }

    getPreference() {
        const v = this.getCookie(this.COOKIE_NAME);
        return ['light', 'dark', 'auto'].includes(v) ? v : 'auto';
    }

    applyTheme(btn, pref) {
        const theme = pref === 'auto' ? (this.media.matches ? 'dark' : 'light') : pref;
        document.documentElement.setAttribute('data-theme', theme);
        const isLight = theme == 'light'
        btn.setAttribute('data-theme-value', isLight ? 'dark' : 'light')
        btn.textContent = isLight ? '🌙' : '☀️';
    }
}

var theme = null
$(() => theme = new _theme())