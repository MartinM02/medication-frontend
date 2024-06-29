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

  it('should submit new form data', async () => {
    const newData = { id: 2, name: 'New Med', quantity: '20', dose: 10, period: 'weekly' }
    apiClientMock.post.mockResolvedValueOnce({ data: newData })
    const wrapper = shallowMount(DynamicForm, {
      data() {
        return {
          name: 'New Med',
          quantity: '20',
          dose: 10,
          period: 'weekly'
        }
      }
    })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.vm.submittedMedication).toContainEqual(newData)
    expect(wrapper.text()).toContain('New Med')
  })

  it('should edit existing medication', async () => {
    const medication = { id: 1, name: 'Test', quantity: '10', dose: 5, period: 'daily' }
    const updatedData = { id: 1, name: 'Updated Med', quantity: '15', dose: 10, period: 'monthly' }
    apiClientMock.get.mockResolvedValueOnce({ data: [medication] })
    apiClientMock.put.mockResolvedValueOnce({ data: updatedData })
    const wrapper = shallowMount(DynamicForm)
    await flushPromises()
    wrapper.vm.editMedication(medication)
    await flushPromises()
    wrapper.setData({ submittedMedication: [updatedData] })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.vm.submittedMedication).toContainEqual(updatedData)
    expect(wrapper.text()).toContain('Updated Med')
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
