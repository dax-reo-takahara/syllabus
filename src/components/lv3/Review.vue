<template lang="pug">
//- 1. 'app' を v-bind せずに直接 id="app" と書くべきです。
div#app(v-bind:id="'app'")
  //- buttonタグを使って可読性を上げる
  div.button(@click="onClick") Clickable
  div.information
    input(v-model="inputValue" @keyup.enter="onEnterSearch" placeholder="検索")
    div.searched-item
      | 検索結果: {{ searchedItem }}

  //- 複数の属性がある場合は改行して書くべきです。
  //- v-forとv-ifが別の要素で使用してください
  div.item(v-for="item, i in items" v-if="showItems" @click="selectItem(i)")
    //- keyが未設定なので選択状態がバグりませんか
    div.item-inner(:class="{ selected: selectedIndex === i }")
      span {{ item.name }}
      div.button(@click.stop="addItem(i)") Add
      div.button(@click.stop="removeItem(i)") Remove

  .button(@click="handleClick('Click')")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";

export default defineComponent({
  props: {
    propName: {
      type: String,
      // スペルミスです。required にしてください。
      require: true,
    },
  },
  setup(props, { emit }) {
    // リアクティブにする必要はなさそうです
    // 定数名が具体的でない
    const count = ref<number>(0);

    /** inputの値 */
    const inputValue = ref("");

    /** 検索したitem */
    const searchedItem = ref();

    /** 選択したindex */
    const selectedIndex = ref<number | null>(null);

    // anyを使用せず型定義をしてください
    /** itemリスト */
    const items = ref<any[]>([]);

    /** itemリストの表示 */
    const showItems = ref<boolean>(true);

    // 6: watchでなくcomputedにするべきです。
    watch(
      () => props.propName,
      (newVal) => {
        // return節にできるのでは？
        // switchで良いのでは？
        if (count.value != null && newVal === "review") {
          items.value = [{ name: "john" }, { name: "jane" }];
        } else if (count.value != null && newVal === "etc") {
          items.value = [];
        }
      },
      // ??. immediate を設定しないと何も表示されないのでは？
      { immediate: true }
    );

    /**
      * カウンターを更新
      */
    const handleClick = () => {
      count.value++;
    };

    /**
      * itemの選択
      * @param index index
      */
    function selectItem(index: number) {
      selectedIndex.value = index;
    }

    /**
      * itemの検索
      */
    function onEnterSearch() {
      const target = items.value.filter(
        (item) => item.name == inputValue.value
      );
      console.log("search", inputValue.value, target);
      // 追加: targetがなかったらエラーになりませんか？
      searchedItem.value = target[0].name;
    }

    // 13. onClickが何をクリックするのか関数名に明示されていない
    // 関数の定義と戻り値が異なっている
    /**
      * クリックイベント
      */
    function onClick(): any {
      // 3. emitのイベント名の最初に 'on' は不要です。
      emit("on-click");
    }

    /**
      * item追加
      * @param index index
      * @param key key // 関数の引数に存在しない引数がJSDocに書かれているので削除
      */
    function addItem(index: number) {
      const newItem = {
        // idやnameが重複しますが大丈夫でしょうか？
        id: index,
        name: `Item ${index}`,
      };
      items.value.splice(index + 1, 0, newItem);
    }

    /**
      * item削除
      * @param index index
      */
    function removeItem(index: number) {
      items.value.splice(index, 1);
    }

    return {
      count,
      inputValue,
      searchedItem,
      selectedIndex,
      items,
      showItems,
      handleClick,
      selectItem,
      onEnterSearch,
      onClick,
      addItem,
      removeItem,
    };
  },
});
</script>

<!-- 4. scoped を追加してください。 -->
<style lang="scss">
input {
  border-radius: 10px;
  border: 2px solid blue;
  margin: 5px !important;
}

.searched-item {
  height: 15px;
  font-size: 12px;
  margin: 10px;
}

.button {
  width: 80px;
  border: 1px solid;
  cursor: pointer;
}

.item {
  margin: 0;
  padding: 0;
  border: 1px solid;
}

.item-inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.selected {
  background-color: rgb(253, 179, 183);
}
</style>
