import ReactMarkdown from 'react-markdown'
import styles from './markdown.module.css'

export interface IAboutPageCustomerProps {}

const markdownText = `
# Welcome to Multiverse!


`

export const AboutPageCustomer = ({}: IAboutPageCustomerProps) => {
  return (
    <ReactMarkdown className={styles.markdown}>{markdownText}</ReactMarkdown>
  )
}
