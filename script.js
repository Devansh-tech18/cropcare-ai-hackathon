// Global variables
let uploadedImageData = null;
let currentScreen = 'home-screen';

// Disease database for mock results
const diseaseDatabase = [
    {
        name: "Leaf Blight Disease",
        description: "Leaf blight is a fungal disease that causes brown spots and yellowing of leaves, commonly affecting crops during humid conditions.",
        confidence: 94,
        severity: "moderate",
        immediateActions: [
            "Remove affected leaves immediately",
            "Improve air circulation around plants",
            "Avoid overhead watering"
        ],
        medicines: [
            {
                name: "Copper Sulfate Fungicide",
                dosage: "Apply 2-3 grams per liter of water",
                frequency: "Every 7 days"
            },
            {
                name: "Mancozeb 75% WP",
                dosage: "Apply 2.5 grams per liter of water",
                frequency: "Every 10 days"
            }
        ],
        preventionTips: [
            "Maintain proper spacing between plants",
            "Water at the base of plants, not on leaves",
            "Apply organic compost to boost plant immunity",
            "Monitor crops regularly for early detection"
        ]
    },
    {
        name: "Powdery Mildew",
        description: "A fungal disease that appears as white powdery spots on leaves, stems, and flowers, thriving in warm, dry climates with cool nights.",
        confidence: 89,
        severity: "high",
        immediateActions: [
            "Spray affected areas with water early morning",
            "Remove heavily infected plant parts",
            "Increase air circulation"
        ],
        medicines: [
            {
                name: "Sulfur-based Fungicide",
                dosage: "Apply 3 grams per liter of water",
                frequency: "Every 5 days"
            },
            {
                name: "Potassium Bicarbonate",
                dosage: "Mix 5 grams per liter of water",
                frequency: "Every 7 days"
            }
        ],
        preventionTips: [
            "Plant resistant varieties when possible",
            "Avoid overhead watering",
            "Prune plants for better air circulation",
            "Apply preventive sprays during vulnerable seasons"
        ]
    },
    {
        name: "Bacterial Spot",
        description: "A bacterial infection causing small, dark spots with yellow halos on leaves, leading to defoliation and reduced crop yield.",
        confidence: 87,
        severity: "moderate",
        immediateActions: [
            "Remove and destroy infected plant material",
            "Avoid working with plants when wet",
            "Disinfect tools between plants"
        ],
        medicines: [
            {
                name: "Copper Hydroxide",
                dosage: "Apply 2 grams per liter of water",
                frequency: "Every 10 days"
            },
            {
                name: "Streptomycin Sulfate",
                dosage: "Apply 1 gram per liter of water",
                frequency: "Every 14 days"
            }
        ],
        preventionTips: [
            "Use drip irrigation instead of sprinklers",
            "Rotate crops annually",
            "Plant certified disease-free seeds",
            "Maintain proper field hygiene"
        ]
    },
    {
        name: "Healthy Crop",
        description: "Your crop appears to be healthy with no visible signs of disease. Continue with regular care and monitoring.",
        confidence: 96,
        severity: "low",
        immediateActions: [
            "Continue regular watering schedule",
            "Monitor for any changes",
            "Maintain current care routine"
        ],
        medicines: [
            {
                name: "Organic Fertilizer",
                dosage: "Apply as per package instructions",
                frequency: "Monthly"
            }
        ],
        preventionTips: [
            "Maintain consistent watering",
            "Regular inspection of plants",
            "Proper nutrition management",
            "Seasonal preventive care"
        ]
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize upload area
    setupUploadArea();
    
    console.log("CropCare AI initialized successfully!");
}

function setupEventListeners() {
    // Image input change event
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.addEventListener('change', handleImageUpload);
    }
    
    // Upload area click event
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('click', openGallery);
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);
    }
}

function setupUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        // Make upload area more interactive
        uploadArea.addEventListener('dragenter', function(e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#e8f5e8';
        });
        
        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.style.backgroundColor = '#f8fff8';
        });
    }
}

// Screen navigation functions
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
    }
}

function goBack() {
    showScreen('home-screen');
}

// Camera and image upload functions
function openCamera() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.setAttribute('capture', 'environment');
        imageInput.click();
    }
}

function openGallery() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.removeAttribute('capture');
        imageInput.click();
    }
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageData = e.target.result;
            startAnalysis();
        };
        reader.readAsDataURL(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImageData = e.target.result;
            startAnalysis();
        };
        reader.readAsDataURL(files[0]);
    }
}

// Analysis simulation
function startAnalysis() {
    showScreen('loading-screen');
    simulateAnalysis();
}

function simulateAnalysis() {
    const progressFill = document.getElementById('progressFill');
    const loadingText = document.getElementById('loadingText');
    
    const steps = [
        { progress: 20, text: "Processing image..." },
        { progress: 45, text: "Detecting crop features..." },
        { progress: 70, text: "Analyzing for diseases..." },
        { progress: 90, text: "Generating recommendations..." },
        { progress: 100, text: "Analysis complete!" }
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            if (progressFill) {
                progressFill.style.width = step.progress + '%';
            }
            if (loadingText) {
                loadingText.textContent = step.text;
            }
            currentStep++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                displayResults();
            }, 500);
        }
    }, 800);
}

function displayResults() {
    // Select random disease from database for demo
    const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
    
    // Update image preview
    const previewImage = document.getElementById('previewImage');
    if (previewImage && uploadedImageData) {
        previewImage.src = uploadedImageData;
    }
    
    // Update disease information
    updateDiseaseInfo(randomDisease);
    
    // Show results screen
    showScreen('results-screen');
}

function updateDiseaseInfo(disease) {
    // Update disease name
    const diseaseName = document.getElementById('diseaseName');
    if (diseaseName) {
        diseaseName.textContent = disease.name;
    }
    
    // Update confidence
    const confidence = document.getElementById('confidence');
    if (confidence) {
        const span = confidence.querySelector('span');
        if (span) {
            span.textContent = `${disease.confidence}% Confident`;
        }
    }
    
    // Update description
    const diseaseDescription = document.getElementById('diseaseDescription');
    if (diseaseDescription) {
        diseaseDescription.textContent = disease.description;
    }
    
    // Update severity
    updateSeverity(disease.severity);
    
    // Update immediate actions
    const immediateActions = document.getElementById('immediateActions');
    if (immediateActions) {
        immediateActions.innerHTML = '';
        disease.immediateActions.forEach(action => {
            const li = document.createElement('li');
            li.textContent = action;
            immediateActions.appendChild(li);
        });
    }
    
    // Update medicine list
    const medicineList = document.getElementById('medicineList');
    if (medicineList) {
        medicineList.innerHTML = '';
        disease.medicines.forEach(medicine => {
            const medicineItem = createMedicineItem(medicine);
            medicineList.appendChild(medicineItem);
        });
    }
    
    // Update prevention tips
    const preventionTips = document.getElementById('preventionTips');
    if (preventionTips) {
        preventionTips.innerHTML = '';
        disease.preventionTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            preventionTips.appendChild(li);
        });
    }
}

function updateSeverity(severity) {
    const severityFill = document.getElementById('severityFill');
    const severityText = document.getElementById('severityText');
    
    if (severityFill) {
        severityFill.className = `severity-fill ${severity}`;
    }
    
    if (severityText) {
        severityText.textContent = severity.charAt(0).toUpperCase() + severity.slice(1);
    }
}

function createMedicineItem(medicine) {
    const medicineItem = document.createElement('div');
    medicineItem.className = 'medicine-item';
    
    medicineItem.innerHTML = `
        <div class="medicine-info">
            <strong>${medicine.name}</strong>
            <p>${medicine.dosage}</p>
        </div>
        <div class="medicine-dosage">
            <span>${medicine.frequency}</span>
        </div>
    `;
    
    return medicineItem;
}

// Action button functions
function saveResults() {
    // Simulate saving results
    showNotification('Results saved successfully!', 'success');
}

function shareResults() {
    // Simulate sharing with expert
    if (navigator.share) {
        navigator.share({
            title: 'CropCare AI - Disease Detection Results',
            text: 'Check out my crop analysis results from CropCare AI',
            url: window.location.href
        });
    } else {
        showNotification('Sharing with agricultural expert...', 'info');
    }
}

function scanAnother() {
    // Reset the app for another scan
    uploadedImageData = null;
    const imageInput = document.getElementById('imageInput');
    if (imageInput) {
        imageInput.value = '';
    }
    showScreen('home-screen');
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;
document.head.appendChild(style);

// Demo functions for presentation
function showDemoResults(diseaseType = 'random') {
    // Create mock image for demo
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple plant representation
    ctx.fillStyle = '#4a7c59';
    ctx.fillRect(0, 0, 400, 300);
    ctx.fillStyle = '#90EE90';
    ctx.font = '20px Arial';
    ctx.fillText('Sample Crop Image', 120, 150);
    
    uploadedImageData = canvas.toDataURL();
    
    // Select specific disease or random
    let selectedDisease;
    if (diseaseType === 'random') {
        selectedDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
    } else {
        selectedDisease = diseaseDatabase.find(d => d.name.toLowerCase().includes(diseaseType.toLowerCase())) || diseaseDatabase[0];
    }
    
    // Update image preview
    const previewImage = document.getElementById('previewImage');
    if (previewImage) {
        previewImage.src = uploadedImageData;
    }
    
    // Update disease information
    updateDiseaseInfo(selectedDisease);
    
    // Show results screen
    showScreen('results-screen');
}

// Make demo function available globally for presentation
window.showDemoResults = showDemoResults;

// Navigation menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Handle navigation based on href
            const href = this.getAttribute('href');
            if (href === '#home') {
                showScreen('home-screen');
            } else if (href === '#history') {
                showNotification('History feature coming soon!', 'info');
            } else if (href === '#tips') {
                showNotification('Tips and guidance feature coming soon!', 'info');
            }
        });
    });
});

console.log("CropCare AI JavaScript loaded successfully!");
