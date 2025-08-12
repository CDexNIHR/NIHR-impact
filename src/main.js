import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'

// Vuetify theme configuration
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#193E72',
                    secondary: '#EA5D4E',
                    accent: '#2EA9B0',
                    nihrBlue100: '#193E72', nihrBlue80: '#475989', nihrBlue60: '#747CA3', nihrBlue40: '#A2A4C1', nihrBlue20: '#D0D0E0',
                    nihrCoral100: '#EA5D4E', nihrCoral80: '#EC7C72', nihrCoral60: '#F29E95', nihrCoral40: '#F4BDB8', nihrCoral20: '#F8DDDB',
                    nihrAqua100: '#2EA9B0', nihrAqua80: '#6FBAC0', nihrAqua60: '#9BCBD0', nihrAqua40: '#C1DDE0', nihrAqua20: '#E1EEF0',
                    nihrGreen100: '#46A86C', nihrGreen80: '#79B989', nihrGreen60: '#A1CAA6', nihrGreen40: '#C4DDC5', nihrGreen20: '#E2EEE3',
                    nihrOrange100: '#F29330', nihrOrange80: '#F6AB5D', nihrOrange60: '#F9C187', nihrOrange40: '#FCD6B0', nihrOrange20: '#FDEBD8',
                    nihrPurple100: '#6667AD', nihrPurple80: '#8482BE', nihrPurple60: '#A2A0D0', nihrPurple40: '#C1BFE1', nihrPurple20: '#E0DFF1',
                    nihrYellow100: '#FED47A', nihrYellow80: '#FFDC97', nihrYellow60: '#FFE5B2', nihrYellow40: '#FFEECD', nihrYellow20: '#FFF6E6',
                    nihrGrey100: '#ACBCC3', nihrGrey80: '#BECAD0', nihrGrey60: '#CED6DB', nihrGrey40: '#DFE3E7', nihrGrey20: '#EFF1F3'
                },
            },
        },
    }
});

createApp(App).use(vuetify).mount('#app');
