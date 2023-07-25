import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia, storeToRefs } from 'pinia'
import { mount } from '@vue/test-utils'
// @ts-ignore
import  Home from "../../views/Home.vue"

describe('HomeView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('renders properly', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('Loan Payment Calculator')
    expect(wrapper.text()).toContain('Purchase Price')
    expect(wrapper.text()).toContain('Interest Rate')
    expect(wrapper.text()).toContain('Down Payment in $')
    expect(wrapper.text()).toContain('Down Payment in %')
    expect(wrapper.text()).toContain('Mortgage Term')
    expect(wrapper.text()).toContain('Generate Rates')
    expect(wrapper.text()).toContain('Mortgage Term')
    expect(wrapper.text()).toContain('Monthly Payment')
    expect(wrapper.text()).toContain('Interest Rate')
    expect(wrapper.text()).toContain('Total Amount')
    expect(wrapper.text()).toContain('Total over Loan Term')
  })
})
