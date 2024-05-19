<script>

    export default {
        props: {
            
        },

        data() {
            return {
                currentTheme: localStorage.getItem('theme') ? localStorage.getItem('theme') : null
            }
        },

        methods: {
            detectColorScheme() {
                var theme="light";    //default to light
                //local storage is used to override OS theme settings
                if(localStorage.getItem("theme")){
                    if(localStorage.getItem("theme") == "dark"){
                        theme = "dark";
                    }
                } else if(!window.matchMedia) {
                    //matchMedia method not supported
                    return false;
                } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    //OS theme setting detected as dark
                    theme = "dark";
                }
                //dark theme preferred, set document with a `data-theme` attribute
                if (theme=="dark") {
                    document.documentElement.setAttribute("data-theme", "dark");
                }
            },

            switchTheme() {
                this.currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

                if (this.currentTheme == "light") {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark'); //add this
                }
                else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light'); //add this
                }    
            }
        },
        mounted() {
            this.detectColorScheme();
        }
    }

</script>

<style></style>