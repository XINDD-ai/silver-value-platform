// 移动端交互逻辑 - 银发价值共创平台

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面导航
    initNavigation();
    
    // 初始化轮播
    initBannerSlider();
    
    // 初始化登录弹窗
    initLoginModal();
    
    // 初始化筛选标签
    initFilterTags();
    
    // 初始化课程分类
    initCourseCategories();
    
    // 初始化按钮点击
    initButtonClicks();
});

// 页面导航
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetPage = this.dataset.page;
            
            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // 切换页面
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        });
    });
}

// 轮播Banner
function initBannerSlider() {
    const banners = document.querySelectorAll('.banner');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showBanner(index) {
        banners.forEach((banner, i) => {
            banner.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }
    
    // 自动轮播
    setInterval(() => {
        const nextIndex = (currentIndex + 1) % banners.length;
        showBanner(nextIndex);
    }, 5000);
    
    // 点击指示器
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showBanner(index));
    });
}

// 登录弹窗
function initLoginModal() {
    const modal = document.getElementById('loginModal');
    const profileInfo = document.querySelector('.profile-info');
    const closeBtn = document.querySelector('.modal-close');
    const getCodeBtn = document.querySelector('.btn-get-code');
    const loginForm = document.getElementById('loginForm');
    
    // 打开弹窗
    profileInfo.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // 点击遮罩关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // 获取验证码
    let countdown = 0;
    getCodeBtn.addEventListener('click', function() {
        if (countdown > 0) return;
        
        const phoneInput = document.querySelector('input[type="tel"]');
        const phone = phoneInput.value.trim();
        
        if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
            showToast('请输入正确的手机号');
            return;
        }
        
        showToast('验证码已发送');
        
        countdown = 60;
        getCodeBtn.textContent = `${countdown}s`;
        getCodeBtn.disabled = true;
        
        const timer = setInterval(() => {
            countdown--;
            getCodeBtn.textContent = `${countdown}s`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                getCodeBtn.textContent = '获取验证码';
                getCodeBtn.disabled = false;
            }
        }, 1000);
    });
    
    // 登录提交
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const phone = this.querySelector('input[type="tel"]').value;
        const code = this.querySelector('input[type="text"]').value;
        
        if (!phone || !code) {
            showToast('请填写完整信息');
            return;
        }
        
        showToast('登录成功！');
        
        setTimeout(() => {
            modal.classList.remove('active');
            
            // 更新个人中心显示
            const profileText = document.querySelector('.profile-text');
            profileText.innerHTML = `
                <h3>用户${phone.slice(-4)}</h3>
                <p>普通会员</p>
            `;
        }, 1000);
    });
}

// 筛选标签
function initFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            showToast(`已筛选: ${this.textContent}`);
        });
    });
}

// 课程分类
function initCourseCategories() {
    const categories = document.querySelectorAll('.category-item');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            categories.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 按钮点击
function initButtonClicks() {
    // 快捷入口
    document.querySelectorAll('.entry-item').forEach(item => {
        item.addEventListener('click', function() {
            const service = this.dataset.service;
            const serviceNames = {
                thinktank: '银发智库',
                academy: '银发学堂',
                mutual: '银发互助',
                create: '银发创作'
            };
            showToast(`进入${serviceNames[service]}`);
        });
    });
    
    // 预约按钮
    document.querySelectorAll('.btn-book').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showToast('请先登录后预约');
        });
    });
    
    // 服务卡片
    document.querySelectorAll('.service-card-large').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            showToast('功能开发中...');
        });
    });
    
    // 咨询按钮
    document.querySelectorAll('.btn-consult').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showToast('正在连接专家...');
        });
    });
    
    // 收藏按钮
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.textContent = this.textContent === '❤️' ? '🤍' : '❤️';
            showToast(this.textContent === '❤️' ? '已收藏' : '取消收藏');
        });
    });
    
    // Banner按钮
    document.querySelectorAll('.banner-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = document.getElementById('loginModal');
            modal.classList.add('active');
        });
    });
    
    // 服务操作按钮
    document.querySelectorAll('.btn-service-action').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            showToast('功能开发中...');
        });
    });
    
    // 课程卡片
    document.querySelectorAll('.course-card-full').forEach(card => {
        card.addEventListener('click', function() {
            showToast('正在加载课程...');
        });
    });
    
    // 互助卡片
    document.querySelectorAll('.mutual-card').forEach(card => {
        card.addEventListener('click', function() {
            showToast('正在匹配互助者...');
        });
    });
    
    // 菜单项
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.menu-text').textContent;
            showToast(`${text} - 功能开发中`);
        });
    });
    
    // 成为提供者
    document.querySelectorAll('.provider-option').forEach(option => {
        option.addEventListener('click', function() {
            showToast('申请入口 - 功能开发中');
        });
    });
}

// Toast提示
function showToast(message) {
    // 移除已有的toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 下拉刷新（模拟）
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartY - touchEndY;
    
    // 下拉刷新（当在顶部时）
    if (window.scrollY === 0 && touchEndY - touchStartY > swipeThreshold) {
        // 可以在这里添加下拉刷新逻辑
    }
}

// 页面可见性变化（用于暂停/恢复轮播）
document.addEventListener('visibilitychange', function() {
    // 可以在这里处理页面切换时的逻辑
});

// 模拟数据
const mockData = {
    experts: [
        {
            id: 1,
            name: '李秀芳',
            title: '退休主任医师',
            field: '40年内科临床经验',
            category: 'medical',
            tags: ['健康咨询', '慢病管理', '体检解读'],
            rating: 5.0,
            reviews: 256,
            price: 300,
            avatar: '👨‍⚕️',
            serviceCount: 512
        },
        {
            id: 2,
            name: '张建国',
            title: '退休高级工程师',
            field: '35年机械设计经验',
            category: 'tech',
            tags: ['技术咨询', '项目评审', '工艺改进'],
            rating: 4.9,
            reviews: 128,
            price: 500,
            avatar: '👨‍💼',
            serviceCount: 256
        },
        {
            id: 3,
            name: '陈雅琴',
            title: '退休特级教师',
            field: '38年中学语文教学',
            category: 'education',
            tags: ['作文辅导', '阅读指导', '学习方法'],
            rating: 4.9,
            reviews: 167,
            price: 200,
            avatar: '👩‍🏫',
            serviceCount: 334
        },
        {
            id: 4,
            name: '王明德',
            title: '退休财务总监',
            field: '30年企业财务管理',
            category: 'finance',
            tags: ['财务规划', '税务咨询', '理财建议'],
            rating: 4.8,
            reviews: 89,
            price: 400,
            avatar: '👨‍💼',
            serviceCount: 178
        }
    ],
    courses: [
        {
            id: 1,
            title: '智能手机使用入门 - 从入门到精通',
            instructor: '刘大爷',
            title2: '退休IT工程师',
            students: 1234,
            rating: 4.9,
            price: 0,
            lessons: 12,
            duration: '3小时',
            category: 'tech'
        },
        {
            id: 2,
            title: '退休理财规划 - 让养老金保值增值',
            instructor: '赵阿姨',
            title2: '退休银行经理',
            students: 892,
            rating: 4.8,
            price: 29,
            lessons: 8,
            duration: '2小时',
            category: 'finance'
        },
        {
            id: 3,
            title: '家庭园艺技巧 - 打造阳台花园',
            instructor: '孙奶奶',
            title2: '退休园艺师',
            students: 2156,
            rating: 4.9,
            price: 0,
            lessons: 15,
            duration: '4小时',
            category: 'hobby'
        },
        {
            id: 4,
            title: '国画基础入门 - 梅兰竹菊',
            instructor: '周老师',
            title2: '退休美术教师',
            students: 567,
            rating: 5.0,
            price: 49,
            lessons: 20,
            duration: '6小时',
            category: 'art'
        }
    ]
};

// 导出数据
window.platformData = mockData;

console.log('银发价值共创平台移动端已加载完成！');
