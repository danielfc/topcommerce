package org.kalnee.topcommerce.repository;

import org.kalnee.topcommerce.domain.Order;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select jhi_order from Order jhi_order where jhi_order.user.login = ?#{principal.username}")
    List<Order> findByUserIsCurrentUser();

}
