import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: "#87BD43",
        secondary: '#424242',
        accent: '#82B1FF',
        error: "#FF0000",
        warning:"#fb8a3c",
        info: "#0EC1EF",
        success: "#09893C",
        black: "#000000",
      },
    },
  },
});
