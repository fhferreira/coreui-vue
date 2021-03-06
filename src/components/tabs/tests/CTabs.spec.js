import { mount } from '@vue/test-utils'
import CTabs from '../CTabs'
import CTab from '../CTab'
import Vue from 'vue'

const ComponentName = 'CTabs'
const defaultWrapper = mount(CTabs)

// export const customWrapper = mount(Component, {
//   propsData: {
//     fill: true,
//     justified: true,
//     variant: 'pills',
//     fade: true,
//     vertical: true,
//     addNavWrapperClasses: 'additional-nav-wrapper-class',
//     addNavClasses: 'additional-nav-class',
//     addTabsWrapperClasses: 'additional-tabs-wrapper-class',
//     addTabsClasses: 'additional-tabs-class',
//     addTabClasses: 'additional-tab-class'
//   },
//   slots: {
//     default: [CTab, CTab, customTab]
//   }
// })

const App = Vue.extend({
  components: { CTabs, CTab },
  render (h) {
    return h(
      'CTabs', 
      {
        props: {
          fill: true,
          justified: true,
          variant: 'pills',
          fade: true,
          vertical: { navs: 'col-sm-3', content: 'col-sm-9' },
          addNavWrapperClasses: 'additional-nav-wrapper-class',
          addNavClasses: 'additional-nav-class',
          addTabsWrapperClasses: 'additional-tabs-wrapper-class',
          addTabsClasses: 'additional-tabs-class',
          addTabClasses: 'additional-tab-class'
        }
      }, 
      [
        h('CTab', { props: { active: true, title: 'tab1' }}, ['tab1 content']),
        h('CTab', { props: { title: 'tab2' }}, ['tab2 content']),
        h('CTab', { props: { title: 'tab3' }}),
        h(
          'CTab',
          { props: { disabled: true }, scopedSlots: { title: () => 'tab 4' }},
          ['disabled tab']
        ),
        h(
          'div',
          {},
          ['ignored element']
        )
      ]
    )
  }
})

const customWrapper = mount(App)

describe(ComponentName, () => {
  it('has a name', () => {
    expect(CTabs.name).toBe(ComponentName)
  })
  it('renders correctly', () => {
    expect(defaultWrapper.element).toMatchSnapshot()
  })
  it('renders correctly', () => {
    expect(customWrapper.element).toMatchSnapshot()
  })
  it('do not change tab on click when disabled', () => {
    const tabs = customWrapper.findAll('.nav-item')
    tabs.at(3).trigger('click')
    expect(customWrapper.find('.tab-pane').text()).toBe('tab1 content')
  })
  it('changes tab on click', () => {
    const tabs = customWrapper.findAll('.nav-item')
    tabs.at(2).trigger('click')
    expect(customWrapper.find('.tab-pane').text()).toBe('')
  })
  it('properly changes vertical classes', () => {
    defaultWrapper.setProps({ vertical: true })
    expect(defaultWrapper.vm.gridClasses.navs).toBe('col-sm-4')
  })
})
