import { defineComponent, h} from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      require: true
    }
  },

  setup(props, {slots}) {
    return () => h(
      `h${props.level}`,
      [],
      slots.default()
    )
  }
})