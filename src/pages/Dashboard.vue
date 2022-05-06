<template>
	<div class="container">
		<h5>Events</h5>
		<div class ="row">
			<div class="col-4" v-for="event in events" :key="event.id">
				<div class="card">
					<div class="card-image">
						<img class="image-fit" v-bind:src="event.event_get_event_locations.file_url" />
					</div>
					<div class="card-header">
						{{ event.name }}
					</div>
					<div class="card-body">
						Date: {{ event.date }} <br>
						Start Time: {{ event.start_time }} <br>
						End Time: {{ event.end_time }} <br>
						Location: {{ event.event_get_event_locations.name }}
						Seating Capacity: {{ event.event_get_event_locations.seating_capacity }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import authHeader from '../services/auth-header';
export default {
	data() {
		return {
			events: [],
			carouselResponsiveOptions: [
				{
					breakpoint: "1024px",
					numVisible: 3,
					numScroll: 3,
				},
				{
					breakpoint: "768px",
					numVisible: 2,
					numScroll: 2,
				},
				{
					breakpoint: "560px",
					numVisible: 1,
					numScroll: 1,
				},
			],
		}
	},

	created() {
		if(!this.$store.state.auth.user){
			this.$router.push('/login')
		}
	},
	mounted() {
		this.getEvents();
	},
	methods: {
		getEvents() {
			axios.get(`${process.env.VUE_APP_API_URL}/dashboard`, { headers: authHeader() }).then(response => {
				this.events = response.data.data;
				console.log(this.events)
			})
		}
	}
}
</script>
<style scoped>
.image-fit{
	height: 100%;
	width: 100%;
	object-fit: cover;
}
</style>
