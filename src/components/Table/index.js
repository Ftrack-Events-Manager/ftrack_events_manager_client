import styles from './index.scss'
import {Table as ATable} from "antd";

export const Table = ({className, ...rest}) => (
  <ATable className={`${styles['table-wrapper']} ${className}`} {...rest}/>
)
