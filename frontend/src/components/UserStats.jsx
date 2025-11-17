import { Card, Row, Col } from 'react-bootstrap'
import { FiFileText, FiHeart, FiTrendingUp } from 'react-icons/fi'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const UserStats = ({ user }) => {
  // Calculate total likes from user's blogs
  const totalLikes = user.blogs?.reduce((sum, blog) => sum + (blog.likes || 0), 0) || 0
  
  // Calculate average likes per blog
  const avgLikes = user.blogs?.length > 0 
    ? (totalLikes / user.blogs.length).toFixed(1) 
    : 0

  const stats = [
    {
      icon: FiFileText,
      label: 'Total Blogs',
      value: user.blogs?.length || 0,
      color: 'primary',
      bgColor: 'rgba(13, 110, 253, 0.1)'
    },
    {
      icon: FiHeart,
      label: 'Total Likes',
      value: totalLikes,
      color: 'danger',
      bgColor: 'rgba(220, 53, 69, 0.1)'
    },
    {
      icon: FiTrendingUp,
      label: 'Avg. Likes',
      value: avgLikes,
      color: 'success',
      bgColor: 'rgba(25, 135, 84, 0.1)'
    }
  ]

  return (
    <Row className="g-3 mb-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Col key={stat.label} xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex align-items-center">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ 
                      width: '56px', 
                      height: '56px',
                      backgroundColor: stat.bgColor
                    }}
                  >
                    <Icon size={28} className={`text-${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-muted small">{stat.label}</div>
                    <div className="fs-3 fw-bold">{stat.value}</div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        )
      })}
    </Row>
  )
}

UserStats.propTypes = {
  user: PropTypes.shape({
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        likes: PropTypes.number
      })
    )
  }).isRequired
}

export default UserStats
