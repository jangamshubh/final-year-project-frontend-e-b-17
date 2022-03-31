<template>
    <div class="grid">
        <div class="col-12">
            <Card>
				<template v-slot:title>
					<div class="flex align-items-center justify-content-between mb-0">
						<h5>View Committee Details</h5>
                        <Button icon="pi pi-arrow-left" class="p-button-rounded mr-2 mb-2" @click="redirectToIndex()"/>
                    </div>
                </template>
                <template v-slot:content>
                    <table class="min-w-full border divide-y divide-gray-200">
                        <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                            <tr class="bg-white">
                                <th>Committee Name</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ committee.name }}
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ committee.description }}
                                </td>
                            </tr>
                            <tr>
                                <th>Committee Admin</th>
                                <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                    {{ committee.committee_get_admins.name }} - {{ committee.committee_get_admins.email }}
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
            committee:{
                name:'',
                description: '',
                committee_get_admins: {},
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
        this.getCommittee();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.checkRole != 'Super Admin') {
               this.$router.push("/");
           }
        },
        getCommittee() {
            axios.get(`${process.env.VUE_APP_API_URL}/committees/${this.$route.params.id}/show`,{ headers: authHeader() }).then(data => {
                let response = data.data;
                // console.log(response);
                if(response.status == 'Success') {
                    this.committee = response.data;
                }
            })
        },
        redirectToIndex() {
            this.$router.push({ name: 'committees.index' });
        },
    },
}
</script>
