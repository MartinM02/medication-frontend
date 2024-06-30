import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import DynamicForm from '@/components/DynamicForm.vue'

vi.mock('axios', () => {
  const axiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
  return {
    default: {
      create: () => axiosInstance
    }
  }
})

describe('DynamicForm', () => {
  let apiClientMock

  beforeEach(() => {
    vi.resetAllMocks()
    apiClientMock = axios.create()
  })

  it('should fetch form data on mount', async () => {
    const data = [{ id: 1, name: 'Test', quantity: '10', dose: 5, period: 'daily' }]
    apiClientMock.get.mockResolvedValueOnce({ data })
    const wrapper = shallowMount(DynamicForm)
    await flushPromises()
    expect(wrapper.vm.submittedMedication).toEqual(data)
    expect(wrapper.text()).toContain('Test')
  })

  it('should render correctly', () => {
    const wrapper = shallowMount(DynamicForm)
    expect(wrapper.exists()).toBe(true)
  })

  it('should have empty input fields initially', () => {
    const wrapper = shallowMount(DynamicForm)
    expect(wrapper.vm.name).toBe('')
    expect(wrapper.vm.quantity).toBe('')
    expect(wrapper.vm.dose).toBe(0)
    expect(wrapper.vm.period).toBe('')
  })

  it('should delete a medication', async () => {
    const medication = { id: 1, name: 'Test', quantity: '10', dose: 5, period: 'daily' }
    apiClientMock.get.mockResolvedValueOnce({ data: [medication] })
    apiClientMock.delete.mockResolvedValueOnce({})
    const wrapper = shallowMount(DynamicForm)
    await flushPromises()
    wrapper.vm.deleteMedication(1)
    await flushPromises()
    expect(wrapper.vm.submittedMedication.length).toBe(0)
  })

  it('should display error message on fetch failure', async () => {
    apiClientMock.get.mockRejectedValueOnce(new Error('Failed to fetch'))
    const wrapper = shallowMount(DynamicForm)
    await flushPromises()
    expect(wrapper.vm.errorMessage).toBe('Failed to load form data.')
    expect(wrapper.text()).toContain('Failed to load form data.')
  })
})
