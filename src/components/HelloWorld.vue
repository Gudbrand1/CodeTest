<template>
    <div>
      <vue-resizable
        class="resizable"
        ref="resizableComponent" :width="1920" :height="50">
        <div class="menu">
          <a href="#" id="editor">◧ Editor</a>
          <a href="#" id="tutorial">◨ Tutorial</a>
        </div>
      </vue-resizable>
      <div class="ctr">
        <vue-resizable
        class="resizable"
        ref="resizableComponent" :width="1200" :height="500">
          <div id="container" class="container" >
            <a href="#" id="close" class="close hidden">✖</a>
          </div>
        </vue-resizable>
        <vue-resizable
        class="resizable2"
        ref="resizableComponent" :width="700" :height="500">
          <div id="tutorialcontainer" class="tutorialcontainer">
            <a href="#" id="closetutorial" class="closetutorial hidden">✖</a>
          </div>
        </vue-resizable>
      </div>
    </div>
</template>

<script>
import VueResizable from 'vue-resizable'


export default {
    name: "HelloWorld",
    components: {VueResizable},
    props: {
    msg: String
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  resize: vertical;
  resize: horizontal;
  overflow: none;
  width: 100%;
  height: 100%;
}
.tutorialcontainer{
  resize: vertical;
  resize: horizontal;
  overflow: none;
  width: 100%;
  height: 100%;
  margin-left: 5px;
}

.close{
  text-decoration: none;
  color:black;
  z-index: 1;
  font-weight: 900;
  font-size: 30px;
  position: absolute;
    top: 0px;
    right: 10px;
}
.closetutorial{
  text-decoration: none;
  color:black;
  z-index: 1;
  font-weight: 900;
  font-size: 30px;
  position: absolute;
    top: 0px;
    right: 10px;
}

.resizable, .resizable2{
  display: inline-block!important;
}

.resizable{
  width:60%;
  height: 30%;
  display: flex;
}

.resizable2{
  width:30%;
  height: 30%;
  display: flex;
}

.hidden{
  display: none;
}

.menu{
  background-color: #9e9696;
  text-align: left;
  resize: vertical;
  resize: horizontal;
  overflow: none;
  width: 100%;
  height: 100%;
}


.menu>a{
  text-decoration: none;
  color: black;
  font: 800;
  font-size: 1.5em;
  padding: 0 20px 0 10px;
}
</style>
