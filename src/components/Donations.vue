<template>
  <div class="hero">
  <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
  <div id="app1">
    <v-client-table :columns="columns" :data="donations" :options="options">
      <a slot="upvote" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="upvote(props.row._id)"></a>
      <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editDonation(props.row._id)"></a>
      <a slot="remove" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteDonation(props.row._id)"></a>
      <a slot="child_row" slot-scope="props">
        <div class="vue-message">The message is [ {{props.row.message}} ]</div>
      </a>
    </v-client-table>
    <dfooter></dfooter>
  </div>
  </div>
</template>
<script>
import DonationService from '@/services/donationservice'
import Footer from '@/components/Footer'

// import Router from 'vue-router'

export default {
  data () {
    return {
      messagetitle: ' Donations List ',
      columns: ['_id', 'paymenttype', 'amount', 'upvotes', 'upvote', 'edit', 'remove'],
      donations: [],
      props: ['_id'],
      // message: {},
      errors: [],
      options: {
        perPage: 10,
        filterable: ['paymenttype', 'amount', 'upvotes'],
        sortable: ['upvotes'],
        // sortOrder: [
        //   {
        //     column: 'upvotes',
        //     direction: 'desc'
        //   }
        // ],
        // sortField: 'upvotes',
        headings: {
          _id: 'ID',
          paymenttype: 'Payment Type',
          amount: 'Amount',
          upvotes: 'Upvotes'
        },
        uniqueKey: '_id',
        // childRowTogglerFirst: false,
        orderBy: {
          column: 'upvotes'
        }
      }
    }
  },
  components: {
    'dfooter': Footer
  },
  // Fetches Donations when the component is created.
  created () {
    this.loadDonations()
  },
  methods: {
    loadDonations: function () {
      DonationService.fetchDonations()
        .then(response => {
          // JSON responses are automatically parsed.
          this.donations = response.data
          // this.donations.reverse()
          console.log(this.donations)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    upvote: function (id) {
      DonationService.upvoteDonation(id)
        .then(response => {
          // JSON responses are automatically parsed.
          this.loadDonations()
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editDonation: function (id) {
      this.$router.params = id
      this.$router.push('edit')
      console.log(this.$router.params)
    },
    deleteDonation: function (id) {
      this.$swal({
        title: 'Are you totaly sure?',
        text: 'You can\'t Undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result.value === true) {
          DonationService.deleteDonation(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadDonations()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              // this.$swal('Deleted', 'You successfully deleted this Donation ' + JSON.stringify(response.data, null, 5), 'success')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your Donation still Counts!', 'info')
        }
      })
    }
  }
}
</script>
<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .vue-pagination-ad {
    text-align: center;
  }
  .vue-message {
    text-align: left;
    font-size: 17px;
    margin-left: 30px;
  }
  /*.st-sort-ascent:before{*/
    /*content: '\25B2';*/
  /*}*/
  /*.st-sort-descent:before{*/
    /*content: '\25BC';*/
  /*}*/
  /*th:nth-child(0) {*/
    /*text-align: left;*/
  /*}*/
</style>
