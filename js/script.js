$(document).ready(function() {

    //wallpaper
    function setRandomBackground() {
        const randomNum = Math.floor(Math.random() * 1000);
        const imageUrl = `https://picsum.photos/1920/1080?random=${randomNum}`;
        
        $('body').css({
            'background-image': `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imageUrl}')`,
            'background-size': 'cover',
            'background-position': 'center',
            'background-attachment': 'fixed'
        });
    }

    setRandomBackground();
    
    //add task
    $('#addTask').on('click', function() {
        const taskName = $('#taskInput').val().trim();
        const dueDate = $('#dateInput').val();

        if (taskName === "" || dueDate === "") {
            $('#errorMsg').fadeIn().delay(2000).fadeOut();
            return;
        }

        $('#emptyRow').hide();

        //buat row
        const newRow = `
            <tr class="task-row border-b border-gray-100 hover:bg-green-50" data-status="pending">
                <td class="px-4 py-4 task-name font-medium text-gray-700">${taskName}</td>
                <td class="px-4 py-4 text-center text-sm text-gray-500">${dueDate}</td>
                <td class="px-4 py-4 text-center">
                    <span class="status-badge bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">PENDING</span>
                </td>
                <td class="px-4 py-4 text-center space-x-2">
                    <button class="complete-btn bg-green-100 text-green-600 hover:bg-green-600 hover:text-white p-2 rounded transition-all">✓</button>
                    <button class="delete-btn bg-red-100 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded transition-all">✕</button>
                </td>
            </tr>
        `;

        $('#todoBody').append(newRow);

        $('#taskInput').val("");
        $('#dateInput').val("");
    });

    //delete 1 task
    $(document).on('click', '.delete-btn', function() {
        $(this).closest('tr').fadeOut(300, function() {
            $(this).remove();
            checkEmpty();
        });
    });

    //status complete
    $(document).on('click', '.complete-btn', function() {
        const row = $(this).closest('tr');
        const statusBadge = row.find('.status-badge');
        const taskText = row.find('.task-name');

        if (row.attr('data-status') === 'pending') {
            row.attr('data-status', 'completed');
            statusBadge.text('COMPLETED').removeClass('bg-yellow-100 text-yellow-700').addClass('bg-green-100 text-green-700');
            taskText.addClass('completed-text');
            $(this).text('↺').removeClass('text-green-600').addClass('text-blue-600');
        } else {
            row.attr('data-status', 'pending');
            statusBadge.text('PENDING').removeClass('bg-green-100 text-green-700').addClass('bg-yellow-100 text-yellow-700');
            taskText.removeClass('completed-text');
            $(this).text('✓').removeClass('text-blue-600').addClass('text-green-600');
        }
    });

    //filter
    $('#filterTask').on('change', function() {
        const filterValue = $(this).val();
        
        $('.task-row').each(function() {
            const rowStatus = $(this).attr('data-status');
            
            if (filterValue === 'all' || rowStatus === filterValue) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });

    //delete all
    $('#deleteAll').on('click', function() {
        if (confirm("Are you sure you want to delete all tasks?")) {
            $('.task-row').remove();
            checkEmpty();
        }
    });

    //cek list kosong
    function checkEmpty() {
        if ($('.task-row').length === 0) {
            $('#emptyRow').fadeIn();
        }
    }
});