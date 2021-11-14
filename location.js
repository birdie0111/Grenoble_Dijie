Vue.component('location',{
    props:['location_name'],
    data:function(){
        return {
            count: 0,
        }
    },
    template: `<div><button v-on:click="$emit('click_location', count++)"> {{location_name}} {{ count }} </button></div>`
})
