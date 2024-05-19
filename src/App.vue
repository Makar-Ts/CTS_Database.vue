<script>

import { ref, watch } from 'vue';

import HeaderTabs from "./components/HeaderTabs.vue"
import ThemeController from "./components/ThemeController.vue"
import SearchBar from "./components/SearchBar.vue"
import MainModuleComponent from "./components/MainModuleComponent.vue"
import database from "./assets/data/database.json"

export default {
	components: {
		HeaderTabs,
		ThemeController,
		SearchBar,
		MainModuleComponent
	},

	data () {
		return {
			database_modules: {},
		}
	},

	methods: {
		switchTheme() {
			this.$refs.themeController.switchTheme();
		}
	},  

	setup() {
		const searchBar = ref(null);

		const valueSearch = () => {
			return searchBar.value ? searchBar.value.selectedItem['value_search'] : "";
		};

		const keySearch = () => {
			return searchBar.value ? searchBar.value.selectedItem['key_search'] : "";
		};

		watch(keySearch, (newValue, oldValue) => {
			window.history.pushState("", "why this shit is here", `${window.location.pathname}?type=${newValue}&name=${valueSearch()}`);
		});

		watch(valueSearch, (newValue, oldValue) => {
			window.history.pushState("", "why this shit is here", `${window.location.pathname}?type=${keySearch()}&name=${newValue}`);
		});

		return {
			searchBar
		};
  	},

  	mounted() {
		this.searchBar = this.$refs.searchBar;

		this.database_modules = database

		let urlParams = new URLSearchParams(window.location.search);
		let type = urlParams.get("type");
		let name = urlParams.get("name");

		console.log(`${name} | ${type}`);
		if (type && name) {
			this.$refs.searchBar.setSelected(type, name);
		}
    }
}

</script>

<template>

<ThemeController ref="themeController" />
<HeaderTabs :activeTab=2 
			:switchTheme="switchTheme" />
<SearchBar :searchIn="this.database_modules" 
		   :searchIn_names="{'hulls': 'Hulls', 
		   					 'turrets': 'Turrets', 
							 'guns': 'Guns'}" 
			ref="searchBar"/> 

<MainModuleComponent v-if="this.$refs.searchBar && this.$refs.searchBar.isSelected" 
					 :name="this.$refs.searchBar.selectedItem['value_search']"
					 :type="this.$refs.searchBar.selectedItem['key_search']" 
					 :data="this.database_modules[this.$refs.searchBar.selectedItem['key_search']][this.$refs.searchBar.selectedItem['value_search']]" />

</template>

<style>



</style>
