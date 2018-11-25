<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-money" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <donation-form :donation="donation" donationBtnTitle="Make Donation" @donation-is-created-updated="submitDonation"></donation-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    <dfooter></dfooter>
  </div>
</template>

<script>
import DonationService from '@/services/donationservice'
import DonationForm from '@/components/DonationForm'
import Footer from '@/components/Footer'

export default {
  data () {
    return {
      donation: {paymenttype: 'Direct', amount: 0.0, message: ''},
      messagetitle: ' Make Donation '
    }
  },
  components: {
    'donation-form': DonationForm,
    'dfooter': Footer
  },
  methods: {
    submitDonation: function (donation) {
      DonationService.postDonation(donation)
        .then(response => {
          console.log('submitDonation!')
          console.log('Submitting in submitDonation : ' + donation)
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
