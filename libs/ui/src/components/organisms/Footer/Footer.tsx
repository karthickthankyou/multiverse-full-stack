import Link from 'next/link'
import { Container } from '../../atoms/Container'

export interface IFooterProps {}

export const Footer = () => (
  <footer className="py-8 my-8 text-xs  bg-gray-50">
    <Container className="justify-between sm:flex">
      <a target="_blank" href="https://www.iamkarthick.com" rel="noreferrer">
        Made by
        <span
          // Brand color!
          className="font-black px-1 py-0.5"
        >
          Karthick Ragavendran
        </span>{' '}
        2023
      </a>
      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        <div>Privacy policy</div>
        <div>Cookie policy</div>
        <div>Cookie settings</div>
        <div>Terms and Conditions</div>
      </div>
    </Container>
  </footer>
)
