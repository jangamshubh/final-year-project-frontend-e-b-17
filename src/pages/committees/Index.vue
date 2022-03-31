<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <div class="card-header flex justify-content-between flex-column sm:flex-row">
                    <h5>Committees</h5>
                    <Button type="button" icon="pi pi-plus" class="p-button-outlined mb-2" label="Add" @click="redirectToCreatePage()"/>
                </div>
                <DataTable :value="committees" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true"
                v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1" responsiveLayout="scroll"
                :globalFilterFields="['name']" >

                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()"/>
                        <span class="p-input-icon-left mb-2">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%"/>
                        </span>
                    </div>
                </template>
                <template #empty>
                    No data found.
                </template>
                <template #loading>
                    Loading data. Please wait.
                </template>
                <Column field="name" header="Name" style="min-width:12rem">
                    <template #body="{data}">
                        {{ data.name }}
                    </template>
                    <template #filter="{filterModel}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                    </template>
                </Column>
                <Column field="admin" header="Admin" style="min-width:12rem">
                    <template #body="{data}">
                        {{ data.committee_get_admins.name }}
                    </template>
                </Column>
                <Column>
                    <template #body="data">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCommittee(data.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mr-2" @click="confirmDeleteCommittee(data.data)" />
                        <Button icon="pi pi-eye" class="p-button-rounded p-button-info mr-2" @click="showCommittee(data.data)" />
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="deleteCommitteeDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="user">Are you sure you want to delete <b>{{ committee_data.name }}</b>?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteCommitteeDialog = false"/>
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteCommittee(committee_data.id)" />
                </template>
            </Dialog>
        </div>
    </div>
</div>
</template>
<script>
import { FilterMatchMode,FilterOperator } from 'primevue/api';
import axios from 'axios'
import authHeader from '../../services/auth-header';
export default {
    data() {
        return {
            committees: null,
            filters1: null,
            filters2: {},
            loading1: true,
            loading2: true,
            deleteCommitteeDialog: false,
        }
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
        user() {
            return this.$store.state.auth.user;
        },
        role() {
            return this.$store.state.auth.role;
        },
    },
    created() {
        this.checkUserLogin();
        this.checkUserRole();
        this.initFilters1();
    },
    mounted() {
        this.getAllCommittees();
    },
    methods: {
        checkUserLogin() {
            if (!this.loggedIn) {
                this.$router.push("/login");
            }
        },
        checkUserRole() {
            if(this.role != 'Super Admin') {
               this.$router.push("/");
           }
        },
        showDeleteSuccess() {
            this.$toast.add({ severity:'success', summary: 'Success Message', detail:'Message Detail', life: 3000 });
        },
        getAllCommittees() {
            axios.get(`${process.env.VUE_APP_API_URL}/committees`, { headers: authHeader() }).then(data => {
                this.committees = data.data.data;
                this.loading1 = false;
            })
            this.loading2 = false;
        },
        initFilters1() {
            this.filters1 = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            }
        },
        clearFilter1() {
            this.initFilters1();
        },
        editCommittee(data) {
            this.$router.push({ name: 'committees.edit', params: { id: data.id }});
        },
        showCommittee(data) {
            this.$router.push({ name: 'committees.show', params: { id: data.id }});
        },
        confirmDeleteCommittee(data) {
			this.committee_data = data;
			this.deleteCommitteeDialog = true;
		},
        deleteCommittee(id){
            axios.get(`${process.env.VUE_APP_API_URL}/committees/${id}/delete`, { headers: authHeader() }).then(() => {
                this.getAllCommittees();
                this.deleteCommitteeDialog = false;
                this.showDeleteSuccess();
            })
        },
        redirectToCreatePage() {
            this.$router.push({ name: 'committees.create' });
        },
    },

}
</script>

<style scoped lang="scss">

</style>
