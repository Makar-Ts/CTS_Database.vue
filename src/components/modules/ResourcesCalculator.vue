<script>

import resources from "./../../assets/data/resources.json"

export default {
	components: {

	},

    props: {
        resources_in: {
            type: Object,
            required: true
        }
    },

	data () {
		return {
			resource_items: {},
            calculated_resources: {},
            database_resources: resources,
            resources_toggled: false
		}
	},

	methods: {
		calculateCostRecursion (id, count, cost) {
            if (this.database_resources[id].primary) {
                if (cost.has(id)) {
                    cost.set(id, cost.get(id) + count);
                } else {
                    cost.set(id, count);
                }
                return;
            } else {
                var components = this.database_resources[id].craft;

                for (let key of Object.keys(components)) {
                    this.calculateCostRecursion(key, count * components[key], cost);
                }

                return;
            }
        },

        calculateCost(resources) {
            let cost = new Map();

            for (let key of Object.keys(resources)) {
                this.calculateCostRecursion(key, resources[key], cost);
            }

            console.log(cost);
            return cost;
        },

        convertNamesToIds(names) {
            let ids = {};

            for (let key of Object.keys(names)) {
                let id = "";

                for (let key_res of Object.keys(this.database_resources)) {
                    if (key.includes(this.database_resources[key_res].names[0])) {
                        id = key_res;
                        break;
                    }
                }

                if (id != "") {
                    ids[id] = names[key];
                }
            };

            return ids;
        },

        convertIdToName(id) {
            return this.database_resources[id].names[0];
        },

        recalculateCost() {
            let res_ids = this.convertNamesToIds(this.resource_items);
            console.log(res_ids);   

            let calc_res = this.calculateCost(res_ids);

            this.calculated_resources = {};
            for (let [key, value] of calc_res) {
                this.calculated_resources[key] = value;
            }
        },

        disableItem(event) {
            console.log(event.target.dataset)
            if (event.target.style.textDecoration.includes('line-through')) {
                event.target.style = '';
                this.resource_items[event.target.dataset.name] = event.target.dataset.val;
            } else {
                event.target.style = 'text-decoration: line-through; color: var(--disb);';
                delete this.resource_items[event.target.dataset.name]
            }

            this.recalculateCost()
        }
	},  

  	mounted() {
        this.resource_items = {...this.resources_in}

        this.recalculateCost()
    },

    watch: {
        resources_in: {
            handler(oldValue, newValue) {
                this.resource_items = {...this.resources_in}

                this.recalculateCost()
            },
            deep: true
        }
    }
}

</script>

<template>

<button @click="resources_toggled = !resources_toggled" type="button" id="show_calculated_resources" class="show_calculated_res"><span>=</span></button>
<p class="item_data" v-show="!resources_toggled">
    <div    v-for="(item, key) in resources_in" :key="key"
            :data-name="key" 
            :data-val="item" 
            class="resource_item"
            title="Click to disable"
            @click="disableItem">{{ key }}: {{ item }}</div>
</p><p class="item_data" v-show="resources_toggled">
    <div v-for="(item, key) in calculated_resources" :key="key">{{ this.convertIdToName(key) }}: {{ item }}</div>
</p>

</template>

<style>



</style>