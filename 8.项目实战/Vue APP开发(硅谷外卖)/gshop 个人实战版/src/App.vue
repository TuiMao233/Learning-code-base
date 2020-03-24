<template>
	<div id="app">
		<router-view></router-view>
		<FooterGuide />
	</div>
</template>


<script>
	import FooterGuide from './components/FooterGuide/FooterGuide'
	export default {
		components: { FooterGuide }
	}
</script>

<style lang='stylus'>
	#app {
		height 100%
		overflow hidden
	}
</style>
