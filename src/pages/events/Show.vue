<template>
    <div class="grid">
        <div class="col-12">
            <Card>
				<template v-slot:title>
					<div class="flex align-items-center justify-content-between mb-0">
						<h5>View Event Details</h5>
                        <Button icon="pi pi-arrow-left" class="p-button-rounded mr-2 mb-2" @click="redirectToIndex()"/>
                    </div>
                </template>
                <template v-slot:content>
                    <table class="min-w-full border divide-y divide-gray-200">
                        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                            <tr>
                                <th>Location</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.event_get_event_locations.name }}
                                </td>
                            </tr>
                            <tr class="bg-white">
                                <th>Name</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.name }}
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.description }}
                                </td>
                            </tr>
                            <tr>
                                <th>Number of People Expected ?</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.no_of_people_expected }}
                                </td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.date }}
                                </td>
                            </tr>
                            <tr>
                                <th>Start Time</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.start_time }}
                                </td>
                            </tr>
                            <tr>
                                <th>End Time</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ event.end_time }}
                                </td>
                            </tr>
                            <tr>
                                <th>Is Event Approved ?</th>
                                <td v-if="event.is_approved == 0" class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    No
                                </td>
                                <td v-else class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    Yes
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </Card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import authHeader from '../../services/auth-header';
export default {
    data() {
        return {
            event:{
                name:'',
                description: '',
                date:'',
                start_time:'',
                end_time: '',
                is_approved: '',
                event_get_event_locations: {},
            },
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        checkUser() {
            return this.$store.state.auth.user;
        },
        checkRole() {
            return this.$store.state.auth.role;
        },
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
        this.getEvent();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin' && this.checkRole != 'Committee Admin') {
               this.$router.push("/");
           }
        },
        getEvent() {
            axios.get(`${process.env.VUE_APP_API_URL}/events/${this.$route.params.id}/show`,{ headers: authHeader() }).then(data => {
                let response = data.data;
                // console.log(response);
                if(response.status == 'Success') {
                    this.event = response.data;
                }
            })
        },
        redirectToIndex() {
            this.$router.push({ name: 'events.index' });
        },
    },
}
</script>
