import Vue from 'vue';
import App from './App.vue';
import * as monaco from 'monaco-editor';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js';
import VueResizable from 'vue-resizable';

Vue.component('vue-resizable', VueResizable.default);
new Vue({
  render: h => h(App),
  el: "#app",
  data: () => ({
    windowVisible: true
  })
}).$mount('#app')


let value1="//Press F12 for discovering the dark theme\n//Press F11 for the basic theme \n import Vue from 'vue'; \n import App from './App.vue'; \n import * as monaco from 'monaco-editor'; \n import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker'; \n import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js'; \n import VueResizable from 'vue-resizable'; \n Vue.component('vue-resizable', VueResizable.default); \n new Vue({ \n   render: h => h(App), \n   el: '#app', \n  data: () => ({ \n  windowVisible: true \n  }) \n }).$mount('#app') \n "

function createEditor(){
  if(editornb===0){

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundles that contain the web workers.
self.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
        // Webpack
        if (label === 'json') {
            return new JsonWorker();
        }
        // ....
        return new EditorWorker();
    }
}

    let editor = monaco.editor.create(container, {
          value: value1,
          automaticLayout: true,
          dragAndDrop: true,
          fontSize: "14px",
          language: 'javascript',minimap: {
            enabled: false,
          }
        });

        editor.onMouseUp(function (e) {
          let positionColumn =  e.target.position.column;
          let positionLine =  e.target.position.lineNumber;
          let position = {lineNumber:positionLine,column:positionColumn};
          console.log(position);
          let text = editor.getValue(position); 
          let splitedText=text.split("\n"); 
          let lineContent = splitedText[position.lineNumber-1]; // Get selected line content
          let textToInsert = window.selected; // text to be inserted
          splitedText[position.lineNumber-1] = [lineContent.slice(0, position.column-1), textToInsert , lineContent.slice(position.column-1)].join(''); // Append the text exactly at the selected position (position.column -1)
          editor.setValue(splitedText.join("\n")); // Save the value back to the Editor
          editor.setPosition(position);
          window.selected = '';
        });

    let myCondition = editor.createContextKey(/*key name*/'myCondition', /*default value*/false);

    monaco.editor.defineTheme('myTheme', {
      base: 'vs',
      inherit: true,
      rules: [{ background: '9e9696' }],
      colors: {
          'editor.foreground': '#000000',
          'editor.background': '#E3E3E5',
          'editorCursor.foreground': '#E3E3E5 ',
          'editor.lineHighlightBackground': '#0000FF20',
          'editorLineNumber.foreground': '#008800',
          'editor.selectionBackground': '#88000030',
          'editor.inactiveSelectionBackground': '#88000015'
      }
    });
    
    monaco.editor.setTheme('myTheme');

    editor.addCommand(monaco.KeyCode.F12, function() {
        monaco.editor.setTheme("vs-dark");
    }, 'myCondition')

    editor.addCommand(monaco.KeyCode.F11, function() {
        monaco.editor.setTheme("myTheme");
    }, 'myCondition')


    setTimeout(function() {
        myCondition.set(true);
    }, 100);

  }
}
function createTutorial(){
  let tutorialmonaco = monaco.editor.create(tutorialcontainer, {
    value: '<template>\n<div id="app">\n<HelloWorld msg="Test App"/>\n</div>\n</template>',
    automaticLayout: true,
    dragAndDrop: true,
    language: 'javascript',minimap: {
      enabled: false
    }
  });

  tutorialmonaco.onMouseDown(function (e) {
    console.log('mousedown - ' + e.target.toString());
    window.selected =tutorialmonaco.getModel().getValueInRange(tutorialmonaco.getSelection());
    if(window.selected == ""){
      console.log('nothing selected')
    }else{
      console.log(window.selected);
    }
  });

  console.log(tutorialmonaco.getValue());
}

let editornb = 0;
let tutorialnb = 0;
const close = document.getElementById('close');
const container = document.getElementById('container');
const tutorialcontainer = document.getElementById('tutorialcontainer');
const closetutorial = document.getElementById('closetutorial');

document.getElementById('editor').addEventListener("click", function(event){
  event.preventDefault();
  if(editornb===0){
    createEditor();
    editornb++;
    close.classList.remove("hidden");
  }else{
    container.classList.remove("hidden");
    close.classList.remove("hidden");
  }
  
});
close.addEventListener("click", function(event){
  event.preventDefault();
  if(editornb===1){
    container.classList.add("hidden");
    close.classList.add("hidden");
  }
});
closetutorial.addEventListener("click", function(event){
  event.preventDefault();
  if(tutorialnb===1){
    tutorialcontainer.classList.add("hidden");
    closetutorial.classList.add("hidden");
  }
});

document.getElementById('tutorial').addEventListener("click", function(event){
  event.preventDefault();
  if(editornb===0){
    createEditor();
    close.classList.remove("hidden");
    editornb++;
  }else{
    close.classList.remove("hidden");
    container.classList.remove("hidden");
  }
  if(tutorialnb===0){
    createTutorial();
    closetutorial.classList.remove("hidden");
    tutorialnb++;
  }else{
    closetutorial.classList.remove("hidden");
    tutorialcontainer.classList.remove("hidden");
  }
});