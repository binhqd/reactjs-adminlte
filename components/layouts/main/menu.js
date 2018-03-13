export default () => {
  return [
    {
      name: 'Quản lý chung',
      class: 'fa fa-dashboard',
      id: 'quan-ly-chung',
      items: [
        {
          name: 'Danh mục',
          link: '/categories'
        },
        {
          name: 'Hỏi đáp thường gặp',
          link: '/faqs'
        }
      ]
    },
    {
      name: 'Quản lý doanh nghiệp',
      id: 'quan-ly-doanh-nghiep',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Doanh nghiệp chờ duyệt',
          link: '/businesses/awaiting'
        },
        {
          name: 'Doanh nghiệp đã duyệt',
          link: '/businesses'
        },
        {
          name: 'Doanh nghiệp bị từ chối',
          link: '/businesses/rejected'
        },
        {
          name: 'Thêm doanh nghiệp mới',
          link: '/businesses/add'
        }
      ]
    },
    {
      name: 'Quản lý sản phẩm',
      id: 'quan-ly-san-pham',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Sản phẩm chờ duyệt',
          link: '/products/awaiting'
        },
        {
          name: 'Sản phẩm đã duyệt',
          link: '/products'
        },
        {
          name: 'Sản phẩm bị từ chối',
          link: '/products/rejected'
        }
      ]
    },
    {
      name: 'Tin bài',
      id: 'tin-bai',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Tin Khuyến Mãi',
          link: '/promotions'
        },
        {
          name: 'Danh Mục Tin',
          link: '/article-categories'
        },
        {
          name: 'Tin Tức',
          link: '/articles'
        }
      ]
    },
    {
      name: 'Quản lý yêu cầu',
      id: 'quan-ly-yeu-cau',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Yêu cầu chưa xử lý',
          link: '/requests'
        }
      ]
    },
    {
      name: 'Quản lý nhu cầu đăng',
      id: 'quan-ly-nhu-cau-dang',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Danh sách nhu cầu',
          link: '/demands'
        }
      ]
    },
    {
      name: 'Quản lý người dùng',
      id: 'quan-ly-nguoi-dung',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Thêm người dùng mới',
          link: '/users/add'
        },
        {
          name: 'Danh sách',
          link: '/users'
        }
      ]
    },
    {
      name: 'Khiếu nại/Góp ý',
      id: 'khieunai-gopy',
      class: 'fa fa-dashboard',
      link: '/complains'
    },
    {
      name: 'Thông tin liên hệ',
      id: 'thong-tin-lien-he',
      class: 'fa fa-dashboard',
      link: '/contacts'
    },
    {
      name: 'Quản lý đơn hàng',
      id: 'quan-ly-don-hang',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Đơn hàng chưa xử lý',
          link: '/orders'
        },
        {
          name: 'Đơn hàng đã xử lý',
          link: '/orders/closed'
        },
        {
          name: 'Đơn hàng đã hủy',
          link: '/orders/cancelled'
        }
      ]
    },
    {
      name: 'Danh bạ nhận tin',
      id: 'danh-ba-nhan-tin',
      class: 'fa fa-dashboard',
      items: [
        {
          name: 'Danh sách',
          link: '/subscriptions'
        },
        {
          name: 'Soạn nội dung',
          link: '/subscriptions/content'
        }
      ]
    }
  ];
};

const isMenuOpen = () => {

}
export {isMenuOpen}
