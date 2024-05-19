<script>

function replaceGreekNumerals(str) {
    const greekNumerals = {
        'I': '1',
        'II': '2',
        'III': '3',
        'IV': '4',
        'V': '5',
        'VI': '6',
        'VII': '7',
        'VIII': '8',
        'IX': '9',
        'X': '10'
    };

    // Создаем регулярное выражение для поиска греческих цифр, которые стоят отдельно
    const regex = new RegExp(`\\b(${Object.keys(greekNumerals).join('|')})\\b`, 'g');

    // Заменяем греческие цифры на арабские
    return str.replace(regex, match => greekNumerals[match]);
}

export default {
	components: {

	},

    props: {
        searchIn: {
            type: Object,
            required: true
        },
        searchIn_names: {
            type: Object,
            required: true
        }
    },

	data () {
		return {
			searchResults: {},
            selectedItem: {"key_search": "", "value_search":""},
            isSelected: false
		}
	},

	methods: {
		search (searchFor) {
            searchFor = searchFor.toLowerCase().replace("-", "").replace(" ", "");
            var searchFor_greek = replaceGreekNumerals(searchFor).toLowerCase().replace("-", "").replace(" ", "");
            
            this.searchResults = {}

            for (let key_search of Object.keys(this.searchIn)) {
                let count = 12;

                this.searchResults[key_search] = []

                for (let key of Object.keys(this.searchIn[key_search])) {
                    var greek_search_key = replaceGreekNumerals(key).toLowerCase().replace("-", "").replace(" ", "")
                    var orig_search_key = key.toLowerCase().replace("-", "").replace(" ", "")

                    if (orig_search_key.includes(searchFor) | greek_search_key.includes(searchFor_greek)) {
                        this.searchResults[key_search].push(key)
                        count--;
                    }

                    if (count <= 0) { break; }
                }
            }
        },

        setSelected (key, selected) {
            this.$refs.searchInput.value = selected
            this.searchResults = {}

            this.selectedItem.value_search = selected
            this.selectedItem.key_search = key
            this.isSelected = true;

            console.log(`Selected ${this.selectedItem.value_search} from ${this.selectedItem.key_search}`)
        },
        getSelected () {
            if (this.isSelected) {
                return this.selectedItem
            } else return null
        }
	},  

  	mounted() {
        document.addEventListener('click', (event) =>  {
            var target = event.target;
            var menuContainer = document.getElementById('search_results');

            if (menuContainer && !menuContainer.contains(target)) {
                this.searchResults = {}
            }
        });
    }
}

</script>

<template>

<div class="search_container">
    <input @input="search($event.target.value)" 
           ref="searchInput"
           type="search" 
           id="search_input" 
           placeholder="Search part..." 
           class="search_input">

    <div class="search_results" v-if="Object.keys(this.searchResults).length">
        {{ Object.keys(this.searchResults).length }}
        <br>
        <div id="search_results">
            <div v-for="(item, key) in this.searchResults" :key="key" data-item="{{  }}" data-type="hulls">
                <div v-if="item.length > 0" class="search_result_item">
                    <b><p>{{ searchIn_names[key] }}:</p></b>
                    
                    <p v-for="(item_in, index) in item" :key="index" 
                       style="grid-column: 2;"

                       class="search_result_item-text"
                       
                       @mouseenter="$event.target.style = 'grid-column: 2; background: var(--elem);'"
                       @mouseleave="$event.target.style = 'grid-column: 2; background: var(--back);'"
                       @click="setSelected(key, item_in)">{{ item_in }}</p>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style>

.search_container {
    width: 50%;
    position: relative;
    left: 25%;
    flex: 1 0 auto;
    background-color: var(--back);
}

.search_input {
    position: relative;
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family:Consolas, monospace;
    border: 1px solid var(--bord);
    border-radius: 8px;
    box-sizing: border-box;
    z-index: 20;
}

.search_result_item {
    padding-top: 10px;

    display: grid;
    grid-template-columns: 1fr 5fr;

    border-bottom: 2px solid var(--bord);
}

.search_result_item p {
    margin: 0;
    padding: 4px;
}

.type_search_select, .tier_search_select {
    font-family:Consolas, monospace;
    width: 42%;
    border-radius: 8px;
    font-size: 1em;
    padding: 10px;
}

.tier_search_select {
    margin-left: 1%;
}

.button_search {
    font-family:Consolas, monospace;
    position: absolute;
    background-color: var(--elem);
    border-radius: 8px;
    border: 1px solid var(--bord);
    width: 14%;
    /*height: -webkit-calc(1em + 20px);*/
    height: 43px;
    margin-left: 1%;
}

.button_search:hover, .button:hover, .show_calculated_res:hover {
    background-color: var(--back);
}

.button_search:active, .button:active, .show_calculated_res:active {
    background-color: var(--void);
}

.button_search img {
    max-width: 100%;
    max-height: 100%;
}

.search_results {
    position: absolute;
    width: 100%;
    max-height: 750px; /* Задайте максимальную высоту блока */
    overflow-y: auto; /* Создает вертикальную прокрутку в случае необходимости */
    background-color: var(--back);
    border: 1px solid var(--bord);
    border-radius: 8px;
    top: 20px;
    z-index: 18;
}

.search_results td {
    background-color: rgba(0, 0, 0, 0);
    color: var(--main);
    padding: 10px;
    font-size: 1em;
}

/* Стили для полосы прокрутки */
.search_results::-webkit-scrollbar {
    width: 12px;
}

/* Стили для ползунка */
.search_results::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
}

/* Стили для трека */
.search_results::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, 0.1);
}

.search_results tr:hover td {
    background-color: rgba(0, 0, 0, 0.393);
}

/* Добавляем стили для таблицы, чтобы она занимала 100% ширины */
#search_results {
    width: 100%;
}

/* Удаляем ширину ячеек, чтобы они автоматически подстраивались под контент */
#search_results td {
    width: auto;
}

@media (orientation: portrait) {
    .search_container {
        width: 100%;
        position: relative;
        left: 0%;
    }
}

</style>