<template lang="pug">
//- 1. 'app' を v-bind せずに直接 id="app" と書くべきです。
//- 21. ファイル名/クラス名/IDは揃えた方が良いのでは
div#app(v-bind:id="'review'")
  //- 20. buttonタグを使って可読性を上げる
  div.button(@click="onClick") Clickable
  //- 22. クラス名は複数単語で命名
  div.information
    input(v-model="inputValue" @keyup.enter="onEnterSearch" placeholder="検索")
    div.searched-item
      | 検索結果: {{ searchedItem }}

  //- 2. 複数の属性がある場合は改行して書くべきです。
  //- 5. v-forとv-ifが別の要素で使用してください
  div.item(v-for="item, i in items" v-if="showItems" @click="selectItem(i)")
    //- 9. keyが未設定なので選択状態がバグりませんか
    //- 23. 動的に付与するクラスなのでis-selectedとしてください
    div.item-inner(:class="{ selected: selectedIndex === i }")
      span {{ item.name }}
      div.button(@click.stop="addItem(i)") Add
      div.button(@click.stop="removeItem(i)") Remove

  .button(@click="handleClick('Click')")
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";

type PrimaryKey = {
  id: number;
};

// 11. 型は継承してまとめるべきです
type Items = {
  name: string;
  description?: string;
};

export default defineComponent({
  name: "CodeReview",

  props: {
    propName: {
      type: String,
      // 8. スペルミスです。required にしてください。
      require: false,
    },
  },

  setup(props, { emit }) {
    // 7. リアクティブにする必要はなさそうです
    // 14. 定数名が具体的でない
    //
    const count = ref<number>(0);

    /** inputの値 */
    const inputValue = ref("");

    /** 検索したitem */
    const searchedItem = ref();

    // 10. anyを使用せず型定義をしてください
    /** 選択したindex */
    const selectedIndex = ref<any>();

    /** itemリスト */
    const items = ref<(Items & PrimaryKey)[]>([]);

    /** itemリストの表示 */
    const showItems = ref<boolean>(true);

    // 6: watchでなくcomputedにするべきです。
    watch(
      () => props.propName,
      (newVal) => {
        // 30. ガード節にできるのでは？
        // 17.switchで良いのでは？
        if (count.value != null && newVal === "review") {
          items.value = [
            { id: 0, name: "john" },
            { id: 1, name: "jane" },
          ];
        } else if (count.value != null && newVal === "patternB") {
          items.value = [{ id: 0, name: "B" }];
        } else if (count.value != null && newVal === "patternC") {
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
      // 16. findの方が良いのでは？
      const target = items.value.filter(
        (item) => item.name == inputValue.value
      );
      // 31: targetがなかったらエラーになりませんか？
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

    // 15. 関数の引数に存在しない引数がJSDocに書かれているので削除
    /**
      * item追加
      * @param index index
      * @param key key
      */
    function addItem(index: number) {
      const newItem = {
        // 19. idやnameが重複しますが大丈夫でしょうか？
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
/* 26. クラス以外は詳細度が高くなるので禁止です */
/* 27. 影響範囲を考慮していますか？ */
input {
  border-radius: 10px;
  border: 2px solid blue;
  /* 25. important必要ですか？ */
  margin: 5px !important;
}

.searched-item {
  height: 15px;
  /* 24. 汎用的な値はSCSS変数にしてください */
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

  /* 27. 影響範囲を考慮していますか？ */
  .selected {
    background-color: rgb(253, 179, 183);
  }
}
</style>
