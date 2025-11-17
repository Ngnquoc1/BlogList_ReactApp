import { Table, Placeholder } from 'react-bootstrap'

const UserSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map(i => (
        <tr key={i}>
          <td>
            <Placeholder as="div" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          </td>
          <td className="text-center">
            <Placeholder as="div" animation="glow">
              <Placeholder xs={2} />
            </Placeholder>
          </td>
        </tr>
      ))}
    </>
  )
}

export default UserSkeleton
