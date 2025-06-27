// Application State
class JobBoardApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.currentJob = null;
        this.jobs = [];
        this.companies = [];
        this.users = [];
        this.applications = [];
        
        // Make sure we initialize the application and handle any errors
        try {
            this.init();
        } catch (error) {
            console.error("Error initializing application:", error);
            this.hideLoading();
        }
    }

    init() {
        // Show loading initially
        this.showLoading();
        
        // Load data with timeout to ensure UI is responsive
        setTimeout(() => {
            try {
                this.loadData();
                this.setupEventListeners();
                this.loadUserSession();
                this.showPage('home');
                this.updateStats();
                
                // Hide loading when everything is done
                this.hideLoading();
            } catch (error) {
                console.error("Error during initialization:", error);
                this.hideLoading();
                this.showToast("An error occurred while loading the application.", "error");
            }
        }, 100);
    }

    // Data Management
    loadData() {
        // Load from localStorage or use sample data
        this.jobs = this.getSampleJobs();
        this.companies = this.getSampleCompanies();
        this.users = this.getSampleUsers();
        this.applications = [];
    }

    getSampleJobs() {
        return [
            {
            id: 1,
            title: "Senior React Developer",
            company: "TechCorp Solutions",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120,000 - $150,000",
            postedDate: "2025-01-15",
            description: "We're looking for a Senior React Developer to join our dynamic team. You'll be responsible for building scalable web applications and mentoring junior developers.",
            requirements: ["5+ years React experience", "TypeScript proficiency", "Team leadership skills", "Experience with Redux/Context API"],
            benefits: ["Health insurance", "401k matching", "Flexible hours", "Remote work options"],
            featured: true,
            companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-15",
            employerId: 1
            },
            {
            id: 2,
            title: "UI/UX Designer",
            company: "Creative Studio Inc",
            location: "New York, NY",
            type: "Full-time",
            salary: "$80,000 - $100,000",
            postedDate: "2025-01-14",
            description: "Join our creative team as a UI/UX Designer. Create beautiful and intuitive user experiences for our clients.",
            requirements: ["3+ years design experience", "Figma proficiency", "Portfolio required", "User research experience"],
            benefits: ["Creative environment", "Health insurance", "Professional development", "Flexible schedule"],
            featured: true,
            companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-10",
            employerId: 2
            },
            {
            id: 3,
            title: "Node.js Backend Developer",
            company: "DataFlow Systems",
            location: "Austin, TX",
            type: "Full-time",
            salary: "$100,000 - $130,000",
            postedDate: "2025-01-13",
            description: "Seeking a skilled Node.js developer for our backend team. Build robust APIs and microservices.",
            requirements: ["4+ years Node.js", "MongoDB experience", "API design skills", "Docker knowledge"],
            benefits: ["Remote options", "Stock options", "Learning budget", "Gym membership"],
            featured: true,
            companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-20",
            employerId: 3
            },
            {
            id: 4,
            title: "Frontend Developer",
            company: "StartupXYZ",
            location: "Seattle, WA",
            type: "Contract",
            salary: "$70,000 - $90,000",
            postedDate: "2025-01-12",
            description: "Looking for a talented frontend developer to help build our next-generation platform.",
            requirements: ["3+ years frontend experience", "Vue.js or React", "CSS expertise"],
            benefits: ["Flexible hours", "Stock options", "Remote work"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-05",
            employerId: 4
            },
            {
            id: 5,
            title: "Product Manager",
            company: "InnovateCorp",
            location: "Boston, MA",
            type: "Full-time",
            salary: "$110,000 - $140,000",
            postedDate: "2025-01-11",
            description: "Lead product strategy and development for our innovative products.",
            requirements: ["5+ years product management", "Agile experience", "Data-driven mindset"],
            benefits: ["Health insurance", "Stock options", "Professional development"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-25",
            employerId: 5
            },
            {
            id: 6,
            title: "DevOps Engineer",
            company: "TechCorp Solutions",
            location: "Remote",
            type: "Full-time",
            salary: "$110,000 - $135,000",
            postedDate: "2025-01-10",
            description: "Join our DevOps team to automate deployments and manage cloud infrastructure.",
            requirements: ["AWS or Azure experience", "CI/CD pipelines", "Docker & Kubernetes", "Scripting (Bash/Python)"],
            benefits: ["Remote work", "401k", "Health insurance", "Annual bonus"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-20",
            employerId: 1
            },
            {
            id: 7,
            title: "QA Automation Engineer",
            company: "DataFlow Systems",
            location: "Austin, TX",
            type: "Full-time",
            salary: "$85,000 - $105,000",
            postedDate: "2025-01-09",
            description: "Automate test cases and ensure software quality for our enterprise products.",
            requirements: ["Selenium or Cypress", "API testing", "3+ years QA experience", "CI/CD familiarity"],
            benefits: ["Health insurance", "Remote work", "Learning budget"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-18",
            employerId: 3
            },
            {
            id: 8,
            title: "Junior Web Developer",
            company: "StartupXYZ",
            location: "Denver, CO",
            type: "Part-time",
            salary: "$45,000 - $60,000",
            postedDate: "2025-01-08",
            description: "Entry-level web developer to assist with website maintenance and new features.",
            requirements: ["HTML/CSS/JS basics", "Eagerness to learn", "Team player"],
            benefits: ["Mentorship", "Flexible schedule", "Remote possible"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-10",
            employerId: 4
            },
            {
            id: 9,
            title: "Digital Marketing Specialist",
            company: "Creative Studio Inc",
            location: "New York, NY",
            type: "Full-time",
            salary: "$65,000 - $85,000",
            postedDate: "2025-01-07",
            description: "Plan and execute digital marketing campaigns for our clients.",
            requirements: ["2+ years marketing experience", "SEO/SEM knowledge", "Google Analytics", "Content creation"],
            benefits: ["Creative team", "Health insurance", "Flexible hours"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-15",
            employerId: 2
            },
            {
            id: 10,
            title: "Business Analyst",
            company: "InnovateCorp",
            location: "Boston, MA",
            type: "Full-time",
            salary: "$90,000 - $115,000",
            postedDate: "2025-01-06",
            description: "Analyze business processes and help drive data-driven decisions.",
            requirements: ["3+ years business analysis", "Strong Excel/SQL", "Excellent communication"],
            benefits: ["Health insurance", "Stock options", "Professional growth"],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: "2025-02-12",
            employerId: 5
            }
        ];
    }

    getSampleCompanies() {
        return [
            {
                id: 1,
                name: "TechCorp Solutions",
                description: "Leading technology solutions provider specializing in enterprise software development.",
                website: "https://techcorp.com",
                size: "500-1000 employees",
                industry: "Technology",
                logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 2,
                name: "Creative Studio Inc",
                description: "Award-winning design agency creating beautiful digital experiences.",
                website: "https://creativestudio.com",
                size: "50-100 employees",
                industry: "Design",
                logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&h=100&fit=crop&crop=center"
            },
            {
                id: 3,
                name: "DataFlow Systems",
                description: "Innovative data processing solutions for enterprise clients.",
                website: "https://dataflow.com",
                size: "100-500 employees",
                industry: "Technology",
                logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center"
            }
        ];
    }

    getSampleUsers() {
        return [
            {
                id: 1,
                email: "employer@example.com",
                password: "password123",
                role: "employer",
                companyName: "TechCorp Solutions",
                firstName: "John",
                lastName: "Smith"
            },
            {
                id: 2,
                email: "candidate@example.com",
                password: "password123",
                role: "candidate",
                firstName: "Jane",
                lastName: "Doe"
            }
        ];
    }

    getStoredData(key) {
        try {
            const data = localStorage.getItem(`jobboard_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`Error loading ${key}:`, e);
            return null;
        }
    }

    saveData() {
        try {
            localStorage.setItem('jobboard_jobs', JSON.stringify(this.jobs));
            localStorage.setItem('jobboard_companies', JSON.stringify(this.companies));
            localStorage.setItem('jobboard_users', JSON.stringify(this.users));
            localStorage.setItem('jobboard_applications', JSON.stringify(this.applications));
        } catch (e) {
            console.error('Error saving data:', e);
            // Continue even if storage fails
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Page navigation
            if (target.hasAttribute('data-page')) {
                e.preventDefault();
                this.showPage(target.getAttribute('data-page'));
            }
            
            // Actions
            if (target.hasAttribute('data-action')) {
                const action = target.getAttribute('data-action');
                this.handleAction(action, target);
            }
            
            // Job cards - check if the clicked element or any of its parents has the job-card class
            const jobCard = target.closest('.job-card');
            if (jobCard) {
                const jobId = parseInt(jobCard.getAttribute('data-job-id'));
                this.showJobDetail(jobId);
            }
        });

        // Search functionality
        const heroSearchBtn = document.getElementById('heroSearchBtn');
        if (heroSearchBtn) {
            heroSearchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        const searchButton = document.getElementById('searchButton');
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.performJobSearch();
            });
        }

        // Filters
        ['typeFilter', 'locationFilter', 'sortFilter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    this.performJobSearch();
                });
            }
        });

        // Forms
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e.target);
            });
        }

        const applicationForm = document.getElementById('applicationForm');
        if (applicationForm) {
            applicationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleJobApplication(e.target);
            });
        }

        // Role selector
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectRole(btn.getAttribute('data-role'));
            });
        });

        // Mobile menu
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Search on enter
        const heroSearch = document.getElementById('heroSearch');
        if (heroSearch) {
            heroSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performSearch();
            });
        }

        const jobSearch = document.getElementById('jobSearch');
        if (jobSearch) {
            jobSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performJobSearch();
            });
        }
    }

    // Actions Handler
    handleAction(action, target) {
        switch (action) {
            case 'login':
                this.showModal('loginModal');
                break;
            case 'register':
                this.showModal('registerModal');
                break;
            case 'logout':
                this.logout();
                break;
            case 'dashboard':
                this.showPage('dashboard');
                break;
            case 'closeModal':
                this.closeModal();
                break;
            case 'showLogin':
                this.closeModal();
                this.showModal('loginModal');
                break;
            case 'showRegister':
                this.closeModal();
                this.showModal('registerModal');
                break;
            case 'applyJob':
                if (this.currentUser) {
                    this.showModal('applicationModal');
                } else {
                    this.showToast('Please login to apply for jobs', 'warning');
                    this.showModal('loginModal');
                }
                break;
        }
    }

    // Page Navigation
    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const page = document.getElementById(`${pageName}Page`);
        if (page) {
            page.classList.add('active');
            this.currentPage = pageName;
            
            // Load page-specific content
            switch (pageName) {
                case 'home':
                    this.loadHomePage();
                    break;
                case 'jobs':
                    this.loadJobsPage();
                    break;
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'companies':
                    this.loadCompaniesPage();
                    break;
            }
        }
    }

    // Home Page
    loadHomePage() {
        this.loadFeaturedJobs();
        this.updateStats();
        this.typingAnimation();
    }

    typingAnimation() {
        const el = document.querySelector('.hero__title');
        if (!el) return;
        const text = 'Find Your Dream Job Today';
        let i = 0;
        let typing = true;
        el.textContent = '';
        el.style.display = 'inline-block';
        // Remove previous cursor if any
        const oldCursor = el.querySelector('.typing-cursor');
        if (oldCursor) oldCursor.remove();
        // Add a span for the cursor
        let cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.display = 'inline-block';
        cursor.style.marginLeft = '2px';
        cursor.style.color = 'var(--color-primary)';
        cursor.style.animation = 'blink-cursor 0.7s steps(1) infinite';
        el.innerHTML = '';
        el.appendChild(cursor);
        function updateText(t) {
            el.childNodes[0].nodeValue = t;
        }
        // Set up the text node before the cursor
        el.insertBefore(document.createTextNode(''), cursor);
        function type() {
            if (typing) {
                if (i <= text.length) {
                    updateText(text.slice(0, i));
                    i++;
                    setTimeout(type, 70);
                } else {
                    setTimeout(() => {
                        typing = false;
                        i = text.length - 1; // Start erasing from last char
                        type();
                    }, 1200);
                }
            } else {
                if (i >= 0) {
                    updateText(text.slice(0, i));
                    i--;
                    setTimeout(type, 40);
                } else {
                    updateText(''); // Ensure text is empty
                    setTimeout(() => {
                        typing = true;
                        i = 1; // Start typing from first char
                        type();
                    }, 600);
                }
            }
        }
        type();
    }

    loadFeaturedJobs() {
        const featuredJobs = this.jobs.filter(job => job.featured).slice(0, 6);
        const container = document.getElementById('featuredJobs');
        if (container) {
            container.innerHTML = featuredJobs.map(job => this.createJobCard(job)).join('');
        }
    }

    updateStats() {
        const totalJobs = document.getElementById('totalJobs');
        const totalCompanies = document.getElementById('totalCompanies');
        const totalCandidates = document.getElementById('totalCandidates');
        if (!totalJobs || !totalCompanies || !totalCandidates) return;
        // Target values
        const jobs = this.jobs.length;
        const companies = this.companies.length;
        // For demo, use a random number for candidates
        const candidates = 1023;
        // Animate numbers
        animateCount(totalJobs, jobs, 800);
        animateCount(totalCompanies, companies, 800);
        animateCount(totalCandidates, candidates, 800);
    }

    // Jobs Page
    loadJobsPage() {
        this.performJobSearch();
    }

    performSearch() {
        const heroSearch = document.getElementById('heroSearch');
        const heroLocation = document.getElementById('heroLocation');
        const jobSearch = document.getElementById('jobSearch');
        const locationFilter = document.getElementById('locationFilter');
        
        const query = heroSearch ? heroSearch.value : '';
        const location = heroLocation ? heroLocation.value : '';
        
        // Set search values and navigate to jobs page
        if (jobSearch) jobSearch.value = query;
        if (locationFilter && location) {
            locationFilter.value = location;
        }
        
        this.showPage('jobs');
    }

    performJobSearch() {
        const jobSearch = document.getElementById('jobSearch');
        const typeFilter = document.getElementById('typeFilter');
        const locationFilter = document.getElementById('locationFilter');
        const sortFilter = document.getElementById('sortFilter');
        
        if (!jobSearch || !typeFilter || !locationFilter || !sortFilter) return;
        
        const query = jobSearch.value.toLowerCase();
        const typeValue = typeFilter.value;
        const locationValue = locationFilter.value;
        const sortValue = sortFilter.value;

        let filteredJobs = this.jobs.filter(job => {
            const matchesQuery = !query || 
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query);
            
            const matchesType = !typeValue || job.type === typeValue;
            const matchesLocation = !locationValue || job.location === locationValue;
            
            return matchesQuery && matchesType && matchesLocation;
        });

        // Sort results
        filteredJobs.sort((a, b) => {
            switch (sortValue) {
                case 'newest':
                    return new Date(b.postedDate) - new Date(a.postedDate);
                case 'oldest':
                    return new Date(a.postedDate) - new Date(b.postedDate);
                case 'salary-high':
                    return this.extractSalary(b.salary) - this.extractSalary(a.salary);
                case 'salary-low':
                    return this.extractSalary(a.salary) - this.extractSalary(b.salary);
                default:
                    return 0;
            }
        });

        this.displayJobs(filteredJobs);
    }

    extractSalary(salaryString) {
        const match = salaryString.match(/\$(\d+,?\d+)/);
        return match ? parseInt(match[1].replace(',', '')) : 0;
    }

    displayJobs(jobs) {
        const container = document.getElementById('jobsList');
        const resultsCount = document.getElementById('resultsCount');
        
        if (!container || !resultsCount) return;
        
        resultsCount.textContent = `${jobs.length} job${jobs.length !== 1 ? 's' : ''} found`;
        
        if (jobs.length === 0) {
            container.innerHTML = '<div class="text-center py-16"><p>No jobs found matching your criteria.</p></div>';
            return;
        }

        container.innerHTML = jobs.map(job => this.createJobCard(job)).join('');
    }

    createJobCard(job) {
        const daysAgo = this.getDaysAgo(job.postedDate);
        return `
            <div class="job-card" data-job-id="${job.id}">
                <div class="job-card__header">
                    <div class="job-card__logo">
                        <img src="${job.companyLogo}" alt="${job.company}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dd2b9dd2e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dd2b9dd2e%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2215.5%22%20y%3D%2225.5%22%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                    </div>
                    <div class="job-card__info">
                        <h3>${job.title}</h3>
                        <p class="job-card__company">${job.company}</p>
                    </div>
                </div>
                <div class="job-card__details">
                    <span class="job-card__detail">📍 ${job.location}</span>
                    <span class="job-card__detail">💼 ${job.type}</span>
                    <span class="job-card__detail job-card__salary">💰 ${job.salary}</span>
                </div>
                <div class="job-card__footer">
                    <span class="job-card__date">${daysAgo}</span>
                    ${job.featured ? '<span class="status status--success">Featured</span>' : ''}
                </div>
            </div>
        `;
    }

    getDaysAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 14) return '1 week ago';
        if (diffDays < 28) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
    }

    // Job Detail
    showJobDetail(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        this.currentJob = job;
        this.showPage('jobDetail');
        this.renderJobDetail(job);
    }

    renderJobDetail(job) {
        const container = document.getElementById('jobDetailContent');
        if (!container) return;
        
        const company = this.companies.find(c => c.name === job.company);
        const daysAgo = this.getDaysAgo(job.postedDate);

        container.innerHTML = `
            <div class="job-detail__header">
                <div class="job-detail__company">
                    <div class="job-detail__logo">
                        <img src="${job.companyLogo}" alt="${job.company}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2250%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2050%2050%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dd2b9dd2e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dd2b9dd2e%22%3E%3Crect%20width%3D%2250%22%20height%3D%2250%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2215.5%22%20y%3D%2225.5%22%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                    </div>
                    <div>
                        <h1 class="job-detail__title">${job.title}</h1>
                        <h2 style="margin: 0; color: var(--color-text-secondary);">${job.company}</h2>
                    </div>
                </div>
                <div class="job-detail__meta">
                    <span class="job-detail__meta-item">📍 ${job.location}</span>
                    <span class="job-detail__meta-item">💼 ${job.type}</span>
                    <span class="job-detail__salary">💰 ${job.salary}</span>
                    <span class="job-detail__meta-item">📅 ${daysAgo}</span>
                </div>
                <button class="btn btn--primary btn--lg" data-action="applyJob">Apply Now</button>
            </div>
            
            <div class="job-detail__content">
                <div class="job-detail__section">
                    <h3>Job Description</h3>
                    <p>${job.description}</p>
                </div>
                
                <div class="job-detail__section">
                    <h3>Requirements</h3>
                    <ul>
                        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="job-detail__section">
                    <h3>Benefits</h3>
                    <ul>
                        ${job.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                ${company ? `
                <div class="job-detail__section">
                    <h3>About ${job.company}</h3>
                    <p>${company.description}</p>
                    <p><strong>Industry:</strong> ${company.industry}</p>
                    <p><strong>Company Size:</strong> ${company.size}</p>
                </div>
                ` : ''}
            </div>
        `;
    }

    // Authentication
    loadUserSession() {
        try {
            const savedUser = localStorage.getItem('jobboard_currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                this.updateAuthUI();
            }
        } catch (error) {
            console.error("Error loading user session:", error);
        }
    }

    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            try {
                localStorage.setItem('jobboard_currentUser', JSON.stringify(user));
            } catch (error) {
                console.error("Error saving user session:", error);
            }
            this.updateAuthUI();
            this.closeModal();
            this.showToast('Login successful!', 'success');
        } else {
            this.showToast('Invalid email or password', 'error');
        }
    }

    handleRegister(form) {
        const formData = new FormData(form);
        const roleBtn = document.querySelector('.role-btn.active');
        
        if (!roleBtn) {
            this.showToast('Please select a role', 'error');
            return;
        }
        
        const role = roleBtn.getAttribute('data-role');
        
        const newUser = {
            id: this.users.length + 1,
            email: formData.get('email'),
            password: formData.get('password'),
            role: role,
            firstName: formData.get('firstName') || '',
            lastName: formData.get('lastName') || '',
            companyName: formData.get('companyName') || ''
        };

        // Check if email already exists
        if (this.users.find(u => u.email === newUser.email)) {
            this.showToast('Email already exists', 'error');
            return;
        }

        this.users.push(newUser);
        this.currentUser = newUser;
        
        try {
            localStorage.setItem('jobboard_currentUser', JSON.stringify(newUser));
            this.saveData();
        } catch (error) {
            console.error("Error saving registration data:", error);
        }
        
        this.updateAuthUI();
        this.closeModal();
        this.showToast('Registration successful!', 'success');
    }

    logout() {
        this.currentUser = null;
        try {
            localStorage.removeItem('jobboard_currentUser');
        } catch (error) {
            console.error("Error removing user session:", error);
        }
        this.updateAuthUI();
        this.showPage('home');
        this.showToast('Logged out successfully', 'success');
    }

    updateAuthUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');
        
        if (!authButtons || !userMenu || !userName) return;

        if (this.currentUser) {
            authButtons.classList.add('hidden');
            userMenu.classList.remove('hidden');
            userName.textContent = this.currentUser.firstName || this.currentUser.email.split('@')[0];
        } else {
            authButtons.classList.remove('hidden');
            userMenu.classList.add('hidden');
        }
    }

    selectRole(role) {
        const buttons = document.querySelectorAll('.role-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        const selectedBtn = document.querySelector(`[data-role="${role}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        const candidateFields = document.querySelector('.candidate-fields');
        const employerFields = document.querySelector('.employer-fields');
        
        if (!candidateFields || !employerFields) return;

        if (role === 'candidate') {
            candidateFields.classList.remove('hidden');
            employerFields.classList.add('hidden');
        } else {
            candidateFields.classList.add('hidden');
            employerFields.classList.remove('hidden');
        }
    }

    // Dashboard
    loadDashboard() {
        if (!this.currentUser) {
            this.showPage('home');
            this.showToast('Please login to access dashboard', 'warning');
            return;
        }

        const title = document.getElementById('dashboardTitle');
        const content = document.getElementById('dashboardContent');
        
        if (!title || !content) return;

        if (this.currentUser.role === 'employer') {
            title.textContent = 'Employer Dashboard';
            this.loadEmployerDashboard(content);
        } else {
            title.textContent = 'Candidate Dashboard';
            this.loadCandidateDashboard(content);
        }
    }

    loadEmployerDashboard(container) {
        const myJobs = this.jobs.filter(job => job.employerId === this.currentUser.id);
        const myApplications = this.applications.filter(app => 
            myJobs.some(job => job.id === app.jobId)
        );

        container.innerHTML = `
            <div class="dashboard-nav">
                <button class="active" data-dashboard="overview">Overview</button>
                <button data-dashboard="jobs">My Jobs (${myJobs.length})</button>
                <button data-dashboard="applications">Applications (${myApplications.length})</button>
                <button data-dashboard="post-job">Post New Job</button>
            </div>
            
            <div class="dashboard-section active" id="overview">
                <div class="grid-cols-2">
                    <div class="card">
                        <div class="card__body text-center">
                            <h3>${myJobs.length}</h3>
                            <p>Active Jobs</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card__body text-center">
                            <h3>${myApplications.length}</h3>
                            <p>Total Applications</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-section" id="jobs">
                <h3>My Job Postings</h3>
                <div class="jobs-list">
                    ${myJobs.length > 0 ? myJobs.map(job => `
                        <div class="card mb-16">
                            <div class="card__body">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h4>${job.title}</h4>
                                        <p class="text-secondary">${job.location} • ${job.type}</p>
                                        <p class="text-primary font-semibold">${job.salary}</p>
                                    </div>
                                    <div>
                                        <span class="status status--success">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') : '<p>No jobs posted yet. Use the "Post New Job" section to create job listings.</p>'}
                </div>
            </div>
            
            <div class="dashboard-section" id="applications">
                <h3>Job Applications</h3>
                <div class="applications-list">
                    ${myApplications.length > 0 ? `
                        <table class="applications-table">
                            <thead>
                                <tr>
                                    <th>Applicant</th>
                                    <th>Job</th>
                                    <th>Applied Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${myApplications.map(app => {
                                    const job = this.jobs.find(j => j.id === app.jobId);
                                    return `
                                        <tr>
                                            <td>${app.fullName}</td>
                                            <td>${job ? job.title : 'Unknown'}</td>
                                            <td>${this.formatDate(app.appliedDate)}</td>
                                            <td><span class="status status--info">${app.status}</span></td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    ` : '<p>No applications received yet.</p>'}
                </div>
            </div>
            
            <div class="dashboard-section" id="post-job">
                <h3>Post New Job</h3>
                <form class="post-job-form" id="postJobForm">
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" class="form-control" name="title" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Location</label>
                            <input type="text" class="form-control" name="location" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Job Type</label>
                            <select class="form-control" name="type" required>
                                <option value="">Select Type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Salary Range</label>
                        <input type="text" class="form-control" name="salary" placeholder="e.g., $80,000 - $100,000" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Job Description</label>
                        <textarea class="form-control" name="description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Requirements (one per line)</label>
                        <textarea class="form-control" name="requirements" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Benefits (one per line)</label>
                        <textarea class="form-control" name="benefits" rows="3" required></textarea>
                    </div>
                    <button type="submit" class="btn btn--primary">Post Job</button>
                </form>
            </div>
        `;

        // Add dashboard navigation
        container.querySelectorAll('[data-dashboard]').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.getAttribute('data-dashboard');
                this.showDashboardSection(section);
            });
        });

        // Add post job form handler
        const postJobForm = document.getElementById('postJobForm');
        if (postJobForm) {
            postJobForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePostJob(e.target);
            });
        }
    }

    loadCandidateDashboard(container) {
        const myApplications = this.applications.filter(app => app.candidateId === this.currentUser.id);

        container.innerHTML = `
            <div class="dashboard-nav">
                <button class="active" data-dashboard="overview">Overview</button>
                <button data-dashboard="applications">My Applications (${myApplications.length})</button>
                <button data-dashboard="profile">Profile</button>
            </div>
            
            <div class="dashboard-section active" id="overview">
                <div class="grid-cols-2">
                    <div class="card">
                        <div class="card__body text-center">
                            <h3>${myApplications.length}</h3>
                            <p>Applications Sent</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card__body text-center">
                            <h3>${myApplications.filter(app => app.status === 'Under Review').length}</h3>
                            <p>Under Review</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-section" id="applications">
                <h3>My Applications</h3>
                <div class="applications-list">
                    ${myApplications.length > 0 ? 
                        myApplications.map(app => {
                            const job = this.jobs.find(j => j.id === app.jobId);
                            return `
                                <div class="card mb-16">
                                    <div class="card__body">
                                        <div class="flex justify-between items-center">
                                            <div>
                                                <h4>${job ? job.title : 'Unknown Job'}</h4>
                                                <p class="text-secondary">${job ? job.company : 'Unknown Company'}</p>
                                                <p class="text-secondary">Applied: ${this.formatDate(app.appliedDate)}</p>
                                            </div>
                                            <span class="status status--info">${app.status}</span>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('') : '<p>No applications yet. <a href="#" data-page="jobs">Browse jobs</a> to get started!</p>'
                    }
                </div>
            </div>
            
            <div class="dashboard-section" id="profile">
                <h3>Profile Settings</h3>
                <form class="max-w-md" id="profileForm">
                    <div class="form-group">
                        <label class="form-label">First Name</label>
                        <input type="text" class="form-control" name="firstName" value="${this.currentUser.firstName || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Last Name</label>
                        <input type="text" class="form-control" name="lastName" value="${this.currentUser.lastName || ''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" name="email" value="${this.currentUser.email}" readonly>
                    </div>
                    <button type="submit" class="btn btn--primary">Update Profile</button>
                </form>
            </div>
        `;

        // Add dashboard navigation
        container.querySelectorAll('[data-dashboard]').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.getAttribute('data-dashboard');
                this.showDashboardSection(section);
            });
        });

        // Add profile form handler
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleProfileUpdate(e.target);
            });
        }
    }

    showDashboardSection(sectionName) {
        // Update nav buttons
        document.querySelectorAll('[data-dashboard]').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`[data-dashboard="${sectionName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Show section
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const activeSection = document.getElementById(sectionName);
        if (activeSection) {
            activeSection.classList.add('active');
        }
    }

    handlePostJob(form) {
        const formData = new FormData(form);
        const newJob = {
            id: this.jobs.length + 1,
            title: formData.get('title'),
            company: this.currentUser.companyName,
            location: formData.get('location'),
            type: formData.get('type'),
            salary: formData.get('salary'),
            description: formData.get('description'),
            requirements: formData.get('requirements').split('\n').filter(r => r.trim()),
            benefits: formData.get('benefits').split('\n').filter(b => b.trim()),
            postedDate: new Date().toISOString().split('T')[0],
            featured: false,
            companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
            applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            employerId: this.currentUser.id
        };

        this.jobs.push(newJob);
        this.saveData();
        form.reset();
        this.showToast('Job posted successfully!', 'success');
        this.loadDashboard(); // Refresh dashboard
    }

    handleProfileUpdate(form) {
        const formData = new FormData(form);
        this.currentUser.firstName = formData.get('firstName');
        this.currentUser.lastName = formData.get('lastName');

        // Update in users array
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.users[userIndex] = { ...this.currentUser };
        }

        try {
            localStorage.setItem('jobboard_currentUser', JSON.stringify(this.currentUser));
            this.saveData();
        } catch (error) {
            console.error("Error saving profile update:", error);
        }
        
        this.updateAuthUI();
        this.showToast('Profile updated successfully!', 'success');
    }

    // Job Application
    handleJobApplication(form) {
        if (!this.currentJob) return;

        const formData = new FormData(form);
        const application = {
            id: this.applications.length + 1,
            jobId: this.currentJob.id,
            candidateId: this.currentUser.id,
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            coverLetter: formData.get('coverLetter'),
            resume: formData.get('resume') ? formData.get('resume').name : null,
            appliedDate: new Date().toISOString(),
            status: 'Under Review'
        };

        this.applications.push(application);
        this.saveData();
        this.closeModal();
        this.showToast('Application submitted successfully!', 'success');
        form.reset();
    }

    // Companies Page
    loadCompaniesPage() {
        const container = document.getElementById('companiesGrid');
        if (!container) return;
        
        container.innerHTML = this.companies.map(company => `
            <div class="company-card">
                <div class="company-logo">
                    <img src="${company.logo}" alt="${company.name}" onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dd2b9dd2e%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dd2b9dd2e%22%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2225.5%22%20y%3D%2245%22%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'">
                </div>
                <h3>${company.name}</h3>
                <p>${company.description}</p>
                <div class="company-meta">
                    <p><strong>Industry:</strong> ${company.industry}</p>
                    <p><strong>Size:</strong> ${company.size}</p>
                </div>
                <a href="${company.website}" target="_blank" class="btn btn--outline btn--sm">Visit Website</a>
            </div>
        `).join('');
    }

    // Modal Management
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    // Utility Functions
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString();
    }

    toggleMobileMenu() {
        const nav = document.getElementById('nav');
        if (nav) {
            nav.classList.toggle('active');
        }
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.remove('hidden');
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }
}

// Helper function for count up animation
function animateCount(element, target, duration) {
    let start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (target - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = target + '+';
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.jobBoard = new JobBoardApp();
});

// Add CSS for blinking cursor
if (!document.getElementById('typing-cursor-style')) {
    const style = document.createElement('style');
    style.id = 'typing-cursor-style';
    style.innerHTML = `@keyframes blink-cursor { 0% { opacity: 1; } 49% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 0; } } .typing-cursor { font-weight: bold; font-size: inherit; vertical-align: baseline; }`;
    document.head.appendChild(style);
}