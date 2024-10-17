    package com.projects.smarthouse_backend.controller;
    
    import com.projects.smarthouse_backend.model.Device;
    import com.projects.smarthouse_backend.model.DeviceType;
    import com.projects.smarthouse_backend.model.Room;
    import com.projects.smarthouse_backend.model.User;
    import com.projects.smarthouse_backend.service.DeviceService;
    import com.projects.smarthouse_backend.service.RoomService;
    import com.projects.smarthouse_backend.service.UserService;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
    
    import java.util.List;
    import java.util.Map;
    import java.util.Optional;
    
    @RestController
    @RequestMapping("/api/devices")
    public class DeviceController {
    
        @Autowired
        private DeviceService deviceService;
    
        @Autowired
        private RoomService roomService;
    
    
        @Autowired
        private UserService userService;
    
        @GetMapping
        public List<Device> getAllDevices() {
            return deviceService.getAllDevices();
        }
    
        @GetMapping("/{deviceId}")
        public ResponseEntity<Device> getDeviceById(@PathVariable Long deviceId) {
            Optional<Device> device = deviceService.getDeviceById(deviceId);
            return device.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        }
    
        @GetMapping("/type/{type}")
        public List<Device> getDevicesByType(@PathVariable DeviceType type) {
            return deviceService.getDevicesByType(type);
        }
    
        @PostMapping
        public ResponseEntity<Device> createDevice(@RequestBody Map<String, Object> requestData) {
            Map<String, Object> deviceData = (Map<String, Object>) requestData.get("device");
    
            String name = deviceData.get("name").toString();
            String typeString = deviceData.get("type").toString();
            boolean status = Boolean.parseBoolean(deviceData.get("status").toString());
            Integer brightness = deviceData.get("brightness") != null ? Integer.valueOf(deviceData.get("brightness").toString()) : null;
            Integer temperature = deviceData.get("temperature") != null ? Integer.valueOf(deviceData.get("temperature").toString()) : null;
    
            Long roomId = Long.valueOf(requestData.get("roomId").toString());
            Long userId = Long.valueOf(requestData.get("userId").toString());
    
            if (name == null || typeString == null) {
                throw new IllegalArgumentException("Missing required fields");
            }
    
            DeviceType type = DeviceType.valueOf(typeString);
    
            Device device = new Device();
            device.setName(name);
            device.setType(type);
            device.setStatus(status);
            device.setBrightness(brightness);
            device.setTemperature(temperature);
    
            Room room = roomService.getRoomById(roomId)
                    .orElseThrow(() ->  new RuntimeException("Room not found " + roomId));
    
            User user = userService.getUserById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found " + userId));
    
            device.setRoom(room);
            device.setUser(user);
    
            Device savedDevice = deviceService.saveDevice(device);
    
            return ResponseEntity.ok(savedDevice);
        }
    
        @PutMapping("/{deviceId}")
        public ResponseEntity<Device> updateDevice(@PathVariable Long deviceId, @RequestBody Device updatedDevice) {
            Optional<Device> optionalDevice = deviceService.getDeviceById(deviceId);
            if (optionalDevice.isPresent()) {
                Device existingDevice = optionalDevice.get();
                if (updatedDevice.getName() != null) {
                    existingDevice.setName(updatedDevice.getName());
                }
                if (updatedDevice.getType() != null) {
                    existingDevice.setType(updatedDevice.getType());
                }
                if (updatedDevice.getBrightness() != null) {
                    existingDevice.setBrightness(updatedDevice.getBrightness());
                }
                if (updatedDevice.getTemperature() != null) {
                    existingDevice.setTemperature(updatedDevice.getTemperature());
                }
                if (updatedDevice.getMotionDetectionEnabled() != null) {
                    existingDevice.setMotionDetectionEnabled(updatedDevice.getMotionDetectionEnabled());
                }

                Device savedDevice = deviceService.updateDevice(existingDevice);
                return ResponseEntity.ok(savedDevice);
            }
            return ResponseEntity.notFound().build();
        }
    
        @PostMapping("/{deviceId}/assign-room/{roomId}")
        public ResponseEntity<Device> assignDeviceToRoom(@PathVariable Long deviceId, @PathVariable Long roomId) {
            Optional<Device> optionalDevice = deviceService.getDeviceById(deviceId);
            Optional<Room> optionalRoom = roomService.getRoomById(roomId);
    
            if (optionalDevice.isPresent() && optionalRoom.isPresent()) {
                Device device = optionalDevice.get();
                Room room = optionalRoom.get();
                device.setRoom(room);
                Device updatedDevice = deviceService.updateDevice(device);
                return ResponseEntity.ok(updatedDevice);
            } else if (optionalDevice.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
    
        @PutMapping("/{deviceId}/control")
        public ResponseEntity<Device> controlDevice(@PathVariable Long deviceId, @RequestBody Map<String, Boolean> action) {
            Optional<Device> optionalDevice = deviceService.getDeviceById(deviceId);
    
            if (optionalDevice.isPresent()) {
                Device device = optionalDevice.get();
                Boolean turnOn = action.get("status");
    
                if (turnOn != null) {
                    device.setStatus(turnOn);
                    Device updatedDevice = deviceService.updateDevice(device);
                    return ResponseEntity.ok(updatedDevice);
                } else {
                    return ResponseEntity.badRequest().build();
                }
            } else {
                return ResponseEntity.notFound().build(); // If device not found
            }
        }
    
    
        @DeleteMapping("/{deviceId}")
        public ResponseEntity<Void> deleteDevice(@PathVariable Long deviceId) {
            if (deviceService.getDeviceById(deviceId).isPresent()) {
                deviceService.deleteDevice(deviceId);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.notFound().build();
        }
    }
