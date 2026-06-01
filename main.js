document.addEventListener('DOMContentLoaded', function() {

    let services = [
        { 
            id: 1, 
            name: "Chăm Sóc Da Bùn Khoáng", 
            price: "350.000 VNĐ", 
            desc: "Đắp mặt nạ bùn khoáng thảo mộc tự nhiên kết hợp massage mặt nhẹ nhàng, giúp làm sạch sâu, se khít lỗ chân lông và sáng da mịn màng.", 
            image: "assets/facial.png" 
        },
        { 
            id: 2, 
            name: "Massage Body Đá Nóng", 
            price: "400.000 VNĐ", 
            desc: "Sử dụng đá nóng núi lửa kết hợp bấm huyệt và tinh dầu thiên nhiên giúp đả thông kinh mạch, giải tỏa căng thẳng và giảm đau mỏi toàn thân.", 
            image: "assets/massage.png" 
        },
        { 
            id: 3, 
            name: "Xông Hơi Tinh Dầu Trị Liệu", 
            price: "200.000 VNĐ", 
            desc: "Liệu pháp xông hơi thư giãn sâu với bộ 5 loại tinh dầu nguyên chất (Oải hương, Bạch đàn, Đàn hương, Tràm trà, Hương thảo) giúp thanh lọc cơ thể.", 
            image: "assets/sauna.png" 
        }
    ];

    let editingId = null;

    const serviceList = document.getElementById('service-list');
    const formContainer = document.getElementById('form-container');
    const serviceForm = document.getElementById('service-form');
    const formTitle = document.getElementById('form-title');

    const inputName = document.getElementById('ten-dv');
    const inputPrice = document.getElementById('gia-dv');
    const inputDesc = document.getElementById('mo-ta-dv');
    const inputImage = document.getElementById('anh-dv');

    const btnShowForm = document.getElementById('btn-show-form');
    const btnCancelForm = document.getElementById('btn-cancel-form');

    // hiển thị danh sách dịch vụ ra màn hình (AI tạo giúp em)
    function renderServices() {
        if (!serviceList) return;
        serviceList.innerHTML = ''; 
        
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card';
            
            const imgUrl = service.image || 'https://via.placeholder.com/300x180?text=DI.O+Spa';
            
            card.innerHTML = `
                <img src="${imgUrl}" alt="${service.name}">
                <div>
                    <h4>${service.name}</h4>
                    <div class="price">${service.price}</div>
                    <div class="desc">${service.desc}</div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-edit" data-id="${service.id}">Sửa</button>
                    <button class="btn btn-delete" data-id="${service.id}">Xóa</button>
                </div>
            `;
            serviceList.appendChild(card);
        });
    }

    function openForm() { 
        if (formContainer) formContainer.classList.remove('hidden'); 
    }

    function closeForm() {
        if (formContainer) formContainer.classList.add('hidden');
        if (serviceForm) serviceForm.reset();
        editingId = null;
        if (formTitle) formTitle.textContent = "Thêm Dịch Vụ Mới";
    }

    if (btnShowForm) btnShowForm.addEventListener('click', openForm);
    if (btnCancelForm) btnCancelForm.addEventListener('click', closeForm);

    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const name = inputName.value.trim();
            const price = inputPrice.value.trim();
            const desc = inputDesc.value.trim();
            const image = inputImage.value.trim();

            if (editingId === null) {
                services.push({ 
                    id: Date.now(),
                    name: name, 
                    price: price, 
                    desc: desc,
                    image: image
                });
            } else {
                const idx = services.findIndex(s => s.id === editingId);
                if (idx !== -1) {
                    services[idx].name = name;
                    services[idx].price = price;
                    services[idx].desc = desc;
                    services[idx].image = image;
                }
            }
            
            renderServices(); 
            closeForm();      
        });
    }

    if (serviceList) {
        serviceList.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn-edit')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                const service = services.find(s => s.id === id);
                if (service) {
                    inputName.value = service.name;
                    inputPrice.value = service.price;
                    inputDesc.value = service.desc;
                    inputImage.value = service.image || ""; 
                    
                    editingId = id; 
                    formTitle.textContent = "Cập Nhật Dịch Vụ";
                    openForm();
                    if (formContainer) formContainer.scrollIntoView({ behavior: 'smooth' }); 
                }
            }
            
            if (e.target.classList.contains('btn-delete')) {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (confirm("Bạn có chắc chắn muốn xóa dịch vụ này không?")) {
                    services = services.filter(s => s.id !== id);
                    renderServices(); 
                }
            }
        });
    }
    renderServices();
});