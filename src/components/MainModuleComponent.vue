<script>

import ResourcesCalculator from "./modules/ResourcesCalculator.vue"
import HullModuleComponent from "./modules/HullModuleComponent.vue"
import TurretModuleComponent from "./modules/TurretModuleComponent.vue"
import imgPaths from "./../assets/data/imgPaths.json"

export default {
	components: {
        HullModuleComponent,
        TurretModuleComponent,
        ResourcesCalculator
	},

    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },

	data () {
		return {
			database_imgPaths:  imgPaths,
		}
	}, 

    methods: {
        getPairedName (id) {
            switch (id) {
                case "gun": return "Gun"
                case "turret": return "Turret"
                case "hull": return "Hull"
            }
        },
        extractWeaponNames(inputString) {
            const regex = /\s*\[\d+\]\s*/;
            return inputString.split(regex).map(item => item.trim()).filter(Boolean);
        },
        generateLink(type, module) {
            return window.location.pathname+'?type='+type+'&name='+module
        }
    },

  	mounted() {

    }
}

</script>

<template>

<div class="item_container">
    <p class="item_header stat_header" id="name">{{ name }}</p>
    <div class="stat_header"><div id="item_img_container"><img :src="this.database_imgPaths ? '/src/'+this.database_imgPaths[type][name] : ''" id="item_img" loading="eager"></div></div>
    <p class="item_header">Description</p>  <p class="item_data" id="description">{{ data.description }}</p>
    <p class="item_header">Tier</p>         <p class="item_data" id="tier">{{ data.tier }}</p>
    <p class="item_header">Rarity</p>       <p class="item_data" id="rarity">{{ data.rarity }}</p>
    <p class="item_header">Obtain</p>       <p class="item_data" id="obtain">{{ data.obtain }}</p>
    <p class="item_header"
       v-if="Object.keys(data.resources).length != 0">Resources</p> <div class="resources_container"
                                                                         v-if="Object.keys(data.resources).length != 0">
                                                                            <ResourcesCalculator :resources_in=data.resources />
                                                                        </div>
    <p class="item_header" 
       v-if="data.requires.type != 'None'">Requires</p>     <a class="item_data" 
                                                             id="requires" 
                                                             :href="generateLink(data.requires.type, data.requires.name)"
                                                             v-if="data.requires.type != 'None'">{{ data.requires.name }}</a>
    <HullModuleComponent   :data=data v-if="type == 'hulls'" />
    <TurretModuleComponent :data=data v-if="type == 'turrets'" />

    <p class="item_header">Weight</p>       <p class="item_data" id="weight">{{ data.stats.weight }}</p>
    <div id="stats" class="stat_header"></div>
    <p class="item_header">Based on</p>     <p class="item_data" id="based_on">{{ data.based_on }}</p>
    <p class="item_header stat_header">Paired</p>
    <p class="item_header" id="paired_1_text">{{ getPairedName(Object.keys(data.paired)[0]) }}</p>
        <div class="item_data" id="paired_1"><a v-for="(item, index) in extractWeaponNames(data.paired[Object.keys(data.paired)[0]])" :key="index" 
                                                :href="generateLink(Object.keys(data.paired)[0]+'s', item)">{{ item }}<br></a></div>
    <p class="item_header" id="paired_2_text">{{ getPairedName(Object.keys(data.paired)[1]) }}</p>
        <div class="item_data" id="paired_2"><a v-for="(item, index) in extractWeaponNames(data.paired[Object.keys(data.paired)[1]])" :key="index" 
                                                :href="generateLink(Object.keys(data.paired)[1]+'s', item)">{{ item }}<br></a></div>
</div>

</template>

<style>

.resources_container {
    display: grid;

    grid-template-columns: 30px 1fr;
    column-gap: 3px;
}

.resource_item:hover {
    background-color: var(--elem);
}

.resource_item:active {
    background-color: var(--void);
}

.show_calculated_res {
    font-family:Consolas, monospace;
    background-color: var(--elem);
    border-radius: 8px;
    border: 1px solid var(--bord);
    width: 100%;
    /*height: -webkit-calc(1em + 20px);*/
    height: 100%;

    font-size: 1.5em;
}

.item_container {
    display: grid;
    grid-template-columns: 1fr 6fr;

    padding-top: 30px;
    width: 50%;
    position: relative;
    left: 25%;
    flex: 300 0 auto;
    background-color: var(--back);
    padding-bottom: 50px;
}

.item_container img {
    width: 100%;
    vertical-align: top;
}

.item_header {
    vertical-align: text-top;
    width: 30%;

    font-weight: bold;

    white-space: nowrap;
}

.item_data {
    vertical-align: text-top;
    width: 70%;
}

.item_header, .item_data{
    padding: 0.3em 0.6em 0.3em 0.6em;
}

.stat_header {
    display: grid;
    width: 100%;

    grid-column-start: 1;
    grid-column-end: 3;

    text-align: center;

    border-bottom: 1px solid var(--bord);
    font-size: 1.4em;
    font-weight: bold;

    padding: 0;
}

#name {
    font-size: 2em;
}

.stats {
    padding-left: 5%;
    padding-right: 5%;
}

.stats_ammunition {
    padding-left: 2%;
    padding-right: 2%;
}

.ammo_types {
    padding: 0.1em 0.2em 0.1em 2em;
    background-color: var(--elem);
    border-radius: 0.3em;
}

@media (orientation: portrait) {
    .item_container {
        width: 100%;
        position: relative;
        left: 0%;
    }
}

</style>