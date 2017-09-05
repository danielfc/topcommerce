package org.kalnee.topcommerce.service;

import org.kalnee.topcommerce.domain.Order;
import org.kalnee.topcommerce.repository.OrderRepository;
import org.kalnee.topcommerce.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static org.kalnee.topcommerce.security.AuthoritiesConstants.ADMIN;
import static org.kalnee.topcommerce.security.AuthoritiesConstants.MANAGER;


/**
 * Service Implementation for managing Order.
 */
@Service
@Transactional
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final UserService userService;

    public OrderService(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    /**
     * Save a order.
     *
     * @param order the entity to save
     * @return the persisted entity
     */
    public Order save(Order order) {
        log.debug("Request to save Order : {}", order);
        order.setUser(userService.getUserWithAuthorities());
        order.getOrderItems().forEach(o -> o.setOrder(order));
        return orderRepository.save(order);
    }

    /**
     *  Get all the orders.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Order> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        if (SecurityUtils.isCurrentUserInRole(ADMIN) || SecurityUtils.isCurrentUserInRole(MANAGER)) {
            return orderRepository.findAll(pageable);
        }
        return orderRepository.findAllByUserIsCurrentUser(pageable);
    }

    /**
     *  Get one order by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Order findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        if (SecurityUtils.isCurrentUserInRole(ADMIN) || SecurityUtils.isCurrentUserInRole(MANAGER)) {
            return orderRepository.findOne(id);
        }
        return orderRepository.findOneByUserIsCurrentUser(id);
    }

    /**
     *  Delete the  order by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.delete(id);
    }
}
