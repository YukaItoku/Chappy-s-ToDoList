

(function() {
  'use strict';

  //最初の暗号
  var vm = new Vue({
    el: '#app',
  
    //要素
    data: {
      newItem: '',
      todos: []
    },

    //指定したデータの変更を監視
    watch: {
      //
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
          
        },
        deep: true
      },
      newItem: {
        handler: function() {
           console.log('変更したよ！')
        }
      }
    },
    
    //ライフサイクル
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },


    //メソッド一括管理
    methods: {

　　　 //新todo追加
      addItem: function() {
        var item = {  
          title: this.newItem,
          isDone: false　//最初は完了していない状態
        };
        this.todos.push(item);
        this.newItem = ''; //次のinputから文字にする　　　　
      },
　　　　
      //todo消去
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);　　//index番目から一個削除
        }
      },

      //todos一括消去
      purge: function() {
        if (!confirm('delete finished?')) {
          return;　//キャンセルされたら無しにする
        }
        this.todos = this.remaining;
        //(終わってないものは残す)　remainimgはfunctionでは？　なぜ配列？#11
      }
    },

    //todoの残数を調べる?????終わっていないものの配列を調べる？
    computed: {
      // 算出プロパティ　　todoの中のさらにundoneのものを取ってくる
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;　　//難しい
        });
      }
    }
  });
})();