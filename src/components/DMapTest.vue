<template>
  <div id="app1" class="hero">
    <h3 class="vue-title"><i class="fa fa-globe" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <GmapMap
            :center="{lat:52.25, lng:-7.15}"
            :zoom="10"
            map-type-id="terrain"
            style="width: 1000px; height: 600px"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="center=m.position"
            />
          </GmapMap>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    <div class="vue-footer">
    <dfooter></dfooter>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer'

export default {
  name: 'Map',
  data () {
    return {
      donations: [],
      messagetitle: ' Donations Map '
    }
  },
  components: {
    'dfooter': Footer
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  .vue-footer {
    text-align: center;
    font-size: 17px;
    margin-top: 30px;
    margin-left: 80px;
  }
</style>
