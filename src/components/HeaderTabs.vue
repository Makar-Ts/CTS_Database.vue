<script>

    export default {
        props: {
            activeTab: {
                type: Number,
                required: true
            },
            switchTheme: {
                type: Function,
                required: true
            }
        }
    }

</script>

<template>

<div class="tabs_container">

<button id="change_theme" @click="switchTheme()"><div ><img src="./../assets/dark-mode.png"></div></button>
<a href="./information/"><div :id="activeTab == 0 ? 'tabs_active' : ''"><p>i</p></div></a>
<a href="./wiki/"><div        :id="activeTab == 1 ? 'tabs_active' : ''"><p>W</p></div></a>
<a href="./"><div             :id="activeTab == 2 ? 'tabs_active' : ''"><p>Search</p></div></a>
<a href="./all_objects/"><div :id="activeTab == 3 ? 'tabs_active' : ''"><p>By filters</p></div></a>
<a href="./compare/"><div     :id="activeTab == 4 ? 'tabs_active' : ''"><p>Compare</p></div></a>

</div>

</template>

<style>

.tabs_container {
    width: 50%;
    position: relative;
    text-align: center;
    left: 25%;
    flex: 1 0 auto;
    white-space: nowrap;

    display: grid;
    grid-template-columns: minmax(36px, 1fr) 1fr 1fr 4fr 4fr 4fr;
    top: 10px;
}

.tabs_container a, .tabs_container p{
    text-decoration: none;
    color: var(--disb);
}

.tabs_container div, .tabs_container button {
    vertical-align: middle;
    border: 1px solid var(--bord);
    border-bottom: none;
    border-radius: 5px;
    background-color: var(--void);
    padding-bottom: 10px;
}

.tabs_container button {
    padding: 0;
}

.tabs_container button div {
    border: none;
}

.tabs_container div img {
    border: none;

    max-width: 100%;
    height: 19px;
}

#tabs_active {
    background-color: var(--back);
}

#tabs_active p {
    color: var(--main);
}

.tabs_container div:hover {
    background-color: var(--elem);
}

.tabs_container div:active {
    background-color: var(--void);
}

@media (orientation: portrait) {
    .tabs_container {
        width: 100%;
        position: relative;
        left: 0%;
    }
}

</style>