import type { Meta, StoryObj } from '@storybook/react'
import HScroll from './HScroll'
import { Button } from '../../atoms/Button'

const meta: Meta<typeof HScroll> = {
  component: HScroll,
}
export default meta

const data = [
  'https://res.cloudinary.com/thankyou/image/upload/v1648218985/nike/ikea/sofa-01_fgsi8y.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648218044/nike/ikea/decor-01_rvj6tr.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648216310/nike/ikea/light-02_zjbzuh.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648215863/nike/ikea/furni-4_ik1ofy.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648215649/nike/ikea/furni-03_omo7ch.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648215448/nike/ikea/furniture-02_ekpfno.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648208734/nike/ikea/room01_udxetf.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648218985/nike/ikea/sofa-01_fgsi8y.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648218044/nike/ikea/decor-01_rvj6tr.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648216310/nike/ikea/light-02_zjbzuh.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648215863/nike/ikea/furni-4_ik1ofy.jpg',
  'https://res.cloudinary.com/thankyou/image/upload/v1648215649/nike/ikea/furni-03_omo7ch.jpg',
]

const buttons = [
  'All',
  'Bedroom',
  'Living room',
  'Kitchen',
  'Workspace',
  'Outdoor',
  'Bathroom',
  'Baby & children room',
  'Dining',
  'Hallway',
  'Accessories',

  'All Mobile Phones',
  'All Mobile Accessories',
  'Cases & Covers',
  'Screen Protectors',
  'Power Banks',
  'Refurbished & Open Box',
  'Tablets',
  'Wearable Devices',
  'Smart Home',
  'Office Supplies & Stationery',
  'Software',
]

type Story = StoryObj<typeof HScroll>

export const Primary: Story = {
  render: () => (
    <div className="p-12">
      <HScroll className="flex gap-6 ">
        <HScroll.Body className="gap-1 ">
          {data.map((item) => (
            <HScroll.Child className="relative mb-6 w-72 h-96" key={item}>
              <img
                src={item}
                alt=""
                className="w-full h-full border border-white rounded shadow-md"
              />
            </HScroll.Child>
          ))}
        </HScroll.Body>
        <HScroll.Arrow
          distance={200}
          className="absolute left-0 z-10 h-full -translate-x-1/2"
          arrowClassName="shadow-md"
        />
        <HScroll.Arrow
          distance={200}
          right
          className="absolute right-0 z-10 h-full translate-x-1/2"
          arrowClassName="shadow-md"
        />
      </HScroll>
    </div>
  ),
}

export const TemplatePicturesArrowTop: Story = {
  render: () => (
    <div className="p-12 ">
      <HScroll>
        <div className="flex justify-end space-x-2">
          <HScroll.Arrow
            distance={200}
            className="left-0 z-10 h-full "
            arrowClassName="shadow-md"
          />
          <HScroll.Arrow
            right
            distance={200}
            className="right-0 z-10 h-full "
            arrowClassName="shadow-md"
          />
        </div>
        <HScroll.Body className="gap-1 mt-2">
          {data.map((item) => (
            <HScroll.Child className="relative mb-6 h-96 w-72" key={item}>
              <img
                src={item}
                alt=""
                className="w-full h-full border border-white rounded shadow-md "
              />
            </HScroll.Child>
          ))}
        </HScroll.Body>
      </HScroll>
    </div>
  ),
}

export const TemplateText: Story = {
  render: (args) => (
    <HScroll className="flex">
      <HScroll.Body className="gap-2 no-scrollbar">
        {buttons.map((buttonText) => (
          <HScroll.Child key={buttonText} className="py-2 mb-2">
            <Button className="shadow-lg" color="white">
              {buttonText}
            </Button>
          </HScroll.Child>
        ))}
      </HScroll.Body>
      <HScroll.Arrow
        distance={120}
        className="absolute left-0 z-10 h-full -translate-x-1/2"
        arrowClassName="shadow-md"
      />
      <HScroll.Arrow
        distance={120}
        right
        className="absolute right-0 z-10 h-full translate-x-1/2"
        arrowClassName="shadow-md"
      />
    </HScroll>
  ),
  args: {},
}
