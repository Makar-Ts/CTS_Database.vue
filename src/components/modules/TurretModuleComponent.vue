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
	},  

  	mounted() {
      	
    }
}

</script>

<template>

<p class="item_header stat_header">Armor</p>
<p class="item_header">Front</p>            <p class="item_data">{{ data.stats.armor.front }}mm</p>
<p class="item_header">Back</p>             <p class="item_data">{{ data.stats.armor.back }}mm</p>
<p class="item_header">Side</p>             <p class="item_data">{{ data.stats.armor.side }}mm</p>
<p class="item_header stat_header">Movement</p>
<p class="item_header">Up Limit</p>         <p class="item_data">{{ data.stats.weaponry.gun.limits.up }}</p>
<p class="item_header">Down Limit</p>       <p class="item_data">-{{ data.stats.weaponry.gun.limits.down }}</p>
<p class="item_header">Vertical Speed</p>   <p class="item_data">{{ data.stats.weaponry.gun.speed.vertical }}</p>
<p class="item_header">Horizontal Speed</p> <p class="item_data">{{ data.stats.weaponry.gun.speed.horizontal }}</p>
<p class="item_header stat_header">Weaponry</p>
<p class="item_header">Reload Multiplier</p><p class="item_data">{{ data.stats.weaponry.gun.reload_multiplier }} ({{ reload_multiplier_caliber }}mm)</p>
<p class="item_header">Ammo Storage</p>     <p class="item_data">{{ data.stats.weaponry.ammo_storage }}</p>
<p class="item_header">Clip</p>             <p class="item_data">{{ data.stats.weaponry.clip == 1 ? "Yes" : "No" }}</p>
<p class="item_header">Stabilizer</p>       <p class="item_data">{{ data.stats.weaponry.stabilizer ? "Yes" : "No" }}</p>
<p class="item_header">APS</p>              <p class="item_data">{{ aps }}</p>
<p class="item_header">FCS</p>              <p class="item_data">{{ fcs }}</p>
<p class="item_header">Zoom</p>             <p class="item_data">{{ data.stats.weaponry.sight.zoom_lower == -1 ? "no data" : `${data.stats.weaponry.sight.zoom_lower}x-${data.stats.weaponry.sight.zoom_upper}x` }}</p>
<p class="item_header">Thermal</p>          <p class="item_data">{{ data.stats.weaponry.sight.thermal == 0 ? "No" : `Gen ${data.stats.weaponry.sight.thermal}` }}</p>
<p class="item_header">Blowout</p>          <p class="item_data">{{ getBlowoutString(data.stats.weaponry.blowout) }}</p>
<p class="item_header">Crew</p>             <div class="item_data">
                                                <div v-for="(item_in, key) in getCrewNumber(data.stats.crew)" :key="key">
                                                    <p v-if="item_in > 0">
                                                        {{ key }} x{{ item_in }}
                                                    </p>
                                                </div>
                                            </div>

</template>

<style>



</style>