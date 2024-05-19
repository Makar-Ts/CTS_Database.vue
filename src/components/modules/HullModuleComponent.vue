<script>

export default {

	components: {

	},

    props: {
        data: {
            type: Object,
            required: true
        }
    },

	data () {
		return {
			
		}
	},

	methods: {
		getCrewNumber(crew_arr) {
            let crews = {
                "Gunner": 0,
                "Driver": 0,
                "Commander": 0,
                "Loader": 0
            }

            crew_arr.forEach(element => {
                for (var key of Object.keys(crews)) {
                    if (element.includes(key)) {
                        crews[key] += 1;
                    }
                }
            });

            return crews;
        },
        getBlowoutString(blowout) {
            switch (blowout) {
                case -1: return "None";
                case 0: return "Partial";
                case 1: return "Yes";
                default: return "None";
            }
        },
        getHullAimString(hull_aim) {
            switch (hull_aim) {
                case 0: return "No";
                case 1: return "Suspension only";
                case 2: return "Yes";
                default: return "No";
            }
        }
	},  

  	mounted() {
      	
    }
}

</script>

<template>

<p class="item_header stat_header">Armor</p>
<p class="item_header">Front</p>      <p class="item_data">{{ data.stats.armor.front }}mm</p>
<p class="item_header">Back</p>       <p class="item_data">{{ data.stats.armor.back }}mm</p>
<p class="item_header">Side</p>       <p class="item_data">{{ data.stats.armor.side }}mm</p>
<p class="item_header stat_header">Movement</p>
<p class="item_header">Acceleration</p>   <p class="item_data">{{ data.stats.speed.acceleration }}</p>
<p class="item_header">Max Forward</p>    <p class="item_data">{{ data.stats.speed.forward }}km/h</p>
<p class="item_header">Max Backward</p>   <p class="item_data">{{ data.stats.speed.backward }}km/h</p>
<p class="item_header">Torque</p>         <p class="item_data">{{ data.stats.speed.torque }}k</p>
<p class="item_header">Traverse Rate</p>  <p class="item_data">{{ data.stats.speed.rate }}</p>
<p class="item_header stat_header">Weaponry</p>
<p class="item_header">Ammo Storage</p>   <p class="item_data">{{ data.stats.weaponry.ammo_storage }}</p>
<p class="item_header">Blowout</p>        <p class="item_data">{{ getBlowoutString(data.stats.weaponry.blowout) }}</p>
<p class="item_header">Hull Aim</p>       <p class="item_data">{{ getHullAimString(data.stats.weaponry.hull_aim) }}</p>
<p class="item_header">APS</p>          <p class="item_data"></p>
<p class="item_header">Protection</p>   <p class="item_data"><img src=""></p>
<p class="item_header">Crew</p>         <div class="item_data">
                                            <div v-for="(item_in, key) in getCrewNumber(data.stats.crew)" :key="key">
                                                <p v-if="item_in > 0">
                                                    {{ key }} x{{ item_in }}
                                                </p>
                                            </div>
                                        </div>

</template>

<style>



</style>