const RunningRecordModel = require('../models/runningRecord.model');

exports.createRecord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { race_name, race_year, distance, duration, surface_type, run_date } = req.body;
        console.log(req.body);

        // Validate dữ liệu
        if (!distance || !duration || !run_date) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        const recordId = await RunningRecordModel.create(userId, { race_name, race_year, distance, duration, surface_type, run_date });

        res.status(201).json({
            success: true,
            message: 'Thêm kỷ lục chạy thành công',
            data: { record_id: recordId }
        });

    } catch (error) {
        console.error('Create running record error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi thêm kỷ lục chạy'
        });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { recordId } = req.params;
        const recordData = req.body;

        const record = await RunningRecordModel.getById(recordId, userId);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy kỷ lục chạy'
            });
        }

        await RunningRecordModel.update(recordId, userId, recordData);

        res.json({
            success: true,
            message: 'Cập nhật kỷ lục chạy thành công'
        });

    } catch (error) {
        console.error('Update running record error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật kỷ lục chạy'
        });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { recordId } = req.params;
        console.log('recordId', recordId);

        const record = await RunningRecordModel.getById(recordId, userId);
        if (!record) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy kỷ lục chạy'
            });
        }

        await RunningRecordModel.delete(recordId, userId);

        res.json({
            success: true,
            message: 'Xóa kỷ lục chạy thành công'
        });

    } catch (error) {
        console.error('Delete running record error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa kỷ lục chạy'
        });
    }
}; 